import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createStripeCheckoutSession } from '@/lib/payments/stripe'
import { createPayPalOrder } from '@/lib/payments/paypal'
import { createOrangeMoneyPayment } from '@/lib/payments/orange-money'
import { createWavePayment } from '@/lib/payments/wave'
import { logger } from '@/lib/logger'

const ctx = 'checkout'
const VALID_PAYMENT_METHODS = ['stripe', 'paypal', 'orange_money', 'wave'] as const
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_QUANTITY = 20
const MAX_NAME_LEN = 100
const MAX_EMAIL_LEN = 254
const MAX_PHONE_LEN = 30

function sanitize(str: unknown): string {
  return typeof str === 'string' ? str.trim().slice(0, MAX_NAME_LEN) : ''
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, firstName, lastName, phone, items, promoCode, paymentMethod } = body as Record<string, unknown>

    // ── Validation ──
    const errors: string[] = []

    const cleanEmail = sanitize(email)
    const cleanFirst = sanitize(firstName)
    const cleanLast = sanitize(lastName)
    const cleanPhone = typeof phone === 'string' ? phone.trim().slice(0, MAX_PHONE_LEN) : null

    if (!cleanEmail || !EMAIL_RE.test(cleanEmail)) {
      errors.push('Courriel invalide')
    }
    if (!cleanFirst) errors.push('Prénom requis')
    if (!cleanLast) errors.push('Nom requis')
    if (!Array.isArray(items) || items.length === 0) {
      errors.push('Au moins un billet requis')
    } else if (items.length > 50) {
      errors.push('Trop de billets (max 50)')
    }

    const validPayment = VALID_PAYMENT_METHODS.includes(paymentMethod as typeof VALID_PAYMENT_METHODS[number])
    if (!validPayment) {
      errors.push(`Mode de paiement invalide: "${paymentMethod}"`)
    }

    if (errors.length > 0) {
      logger.warn(ctx, 'Validation failed', { errors })
      return NextResponse.json({ error: errors.join(', ') }, { status: 400 })
    }

    // ── Validate quantities ──
    const cartItems = items as { slug: string; quantity: number }[]
    for (const item of cartItems) {
      if (!item.slug || typeof item.quantity !== 'number' || item.quantity < 1 || item.quantity > MAX_QUANTITY) {
        return NextResponse.json({ error: `Quantité invalide pour "${item.slug || '?'}" (1–${MAX_QUANTITY})` }, { status: 400 })
      }
    }

    // ── Fetch ticket types ──
    const slugs = cartItems.map(i => i.slug)
    const ticketTypes = await prisma.ticketType.findMany({
      where: { slug: { in: slugs }, active: true },
    })

    if (ticketTypes.length !== slugs.length) {
      const found = new Set(ticketTypes.map(t => t.slug))
      const missing = slugs.filter(s => !found.has(s))
      return NextResponse.json({ error: `Types de billets invalides: ${missing.join(', ')}` }, { status: 400 })
    }

    // ── Calculate totals ──
    let subtotal = 0
    const orderItems = cartItems.map(item => {
      const tt = ticketTypes.find(t => t.slug === item.slug)!
      const lineTotal = tt.price * item.quantity
      subtotal += lineTotal
      return {
        ticketTypeId: tt.id,
        quantity: item.quantity,
        unitPrice: tt.price,
      }
    })

    // ── Promo code ──
    let discount = 0
    let promoRecord = null
    if (promoCode && typeof promoCode === 'string') {
      promoRecord = await prisma.promoCode.findUnique({
        where: { code: promoCode.toUpperCase() },
      })

      if (promoRecord && promoRecord.active) {
        const now = new Date()
        if (!promoRecord.validUntil || promoRecord.validUntil > now) {
          if (!promoRecord.maxUses || promoRecord.usedCount < promoRecord.maxUses) {
            discount = promoRecord.discountType === 'percent'
              ? Math.round(subtotal * promoRecord.discountValue / 100)
              : promoRecord.discountValue
          }
        }
      }
    }

    const total = Math.max(subtotal - discount, 0)

    // ── Create order ──
    const method = paymentMethod as typeof VALID_PAYMENT_METHODS[number]

    const order = await prisma.order.create({
      data: {
        email: cleanEmail,
        firstName: cleanFirst,
        lastName: cleanLast,
        phone: cleanPhone,
        status: 'pending',
        subtotal,
        discount,
        total,
        promoCode: promoCode?.toUpperCase() || null,
        paymentMethod: method,
        items: { create: orderItems },
      },
    })

    logger.info(ctx, 'Order created', { orderId: order.id, email: cleanEmail, total, method })

    if (promoRecord) {
      await prisma.promoCode.update({
        where: { id: promoRecord.id },
        data: { usedCount: { increment: 1 } },
      })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const successUrl = `${appUrl}/billetterie/confirmation`
    const cancelUrl = `${appUrl}/billetterie`

    // ── Create payment session ──
    let paymentUrl: string | null = null
    let paymentId: string | null = null

    try {
      switch (method) {
        case 'stripe': {
          const lineItemsStripe = orderItems.map(item => {
            const tt = ticketTypes.find(t => t.id === item.ticketTypeId)!
            return { name: `FÉCOA 2026 — ${tt.name}`, price: item.unitPrice, quantity: item.quantity }
          })
          const session = await createStripeCheckoutSession({
            orderId: order.id,
            email: cleanEmail,
            lineItems: lineItemsStripe,
            successUrl,
            cancelUrl,
          })
          paymentUrl = session.url
          paymentId = session.id
          break
        }
        case 'paypal': {
          const result = await createPayPalOrder({ orderId: order.id, total })
          const paypalLink = result.links?.find((l: { rel: string }) => l.rel === 'approve')
          paymentUrl = paypalLink?.href || null
          paymentId = result.id
          break
        }
        case 'orange_money': {
          const result = await createOrangeMoneyPayment({ orderId: order.id, total, email: cleanEmail })
          paymentUrl = result.payment_url && result.pay_token
            ? `${result.payment_url}?token=${result.pay_token}`
            : null
          paymentId = result.pay_token || null
          break
        }
        case 'wave': {
          const result = await createWavePayment({ orderId: order.id, total })
          paymentUrl = result.wave_launch_url || null
          paymentId = result.id
          break
        }
      }
    } catch (paymentError) {
      logger.error(ctx, 'Payment session creation failed', paymentError)
      // Order stays pending — user can retry
      return NextResponse.json(
        { error: 'Erreur lors de la création de la session de paiement' },
        { status: 502 }
      )
    }

    await prisma.order.update({
      where: { id: order.id },
      data: { paymentId: paymentId || null },
    })

    return NextResponse.json({
      orderId: order.id,
      paymentUrl,
      total,
      message: 'Commande créée avec succès',
    })
  } catch (error) {
    logger.error(ctx, 'Checkout error', error)
    return NextResponse.json(
      { error: 'Erreur serveur lors de la création de la commande' },
      { status: 500 }
    )
  }
}
