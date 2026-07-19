import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createStripeCheckoutSession } from '@/lib/payments/stripe'
import { createPayPalOrder } from '@/lib/payments/paypal'
import { createOrangeMoneyPayment } from '@/lib/payments/orange-money'
import { createWavePayment } from '@/lib/payments/wave'

interface CartItem {
  slug: string
  quantity: number
}

interface CheckoutRequest {
  email: string
  firstName: string
  lastName: string
  phone?: string
  items: CartItem[]
  promoCode?: string
  paymentMethod: 'stripe' | 'paypal' | 'orange_money' | 'wave'
}

export async function POST(req: NextRequest) {
  try {
    const body: CheckoutRequest = await req.json()
    const { email, firstName, lastName, phone, items, promoCode, paymentMethod } = body

    if (!email || !firstName || !lastName || !items?.length) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    // Récupérer les types de billets
    const slugs = items.map(i => i.slug)
    const ticketTypes = await prisma.ticketType.findMany({
      where: { slug: { in: slugs }, active: true },
    })

    if (ticketTypes.length !== slugs.length) {
      return NextResponse.json({ error: 'Type de billet invalide' }, { status: 400 })
    }

    // Calculer les totaux
    let subtotal = 0
    const orderItems = items.map(item => {
      const tt = ticketTypes.find(t => t.slug === item.slug)!
      const lineTotal = tt.price * item.quantity
      subtotal += lineTotal
      return {
        ticketTypeId: tt.id,
        quantity: item.quantity,
        unitPrice: tt.price,
      }
    })

    // Appliquer promo code
    let discount = 0
    let promoRecord = null
    if (promoCode) {
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

    // Créer la commande
    const order = await prisma.order.create({
      data: {
        email,
        firstName,
        lastName,
        phone: phone || null,
        status: 'pending',
        subtotal,
        discount,
        total,
        promoCode: promoCode?.toUpperCase() || null,
        paymentMethod,
        items: { create: orderItems },
      },
    })

    // Incrémenter usage promo code
    if (promoRecord) {
      await prisma.promoCode.update({
        where: { id: promoRecord.id },
        data: { usedCount: { increment: 1 } },
      })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const successUrl = `${appUrl}/billetterie/confirmation`
    const cancelUrl = `${appUrl}/billetterie`

    // Créer la session de paiement selon la méthode
    let paymentUrl: string | null = null
    let paymentId: string | null = null

    switch (paymentMethod) {
      case 'stripe': {
        const lineItemsStripe = orderItems.map(item => {
          const tt = ticketTypes.find(t => t.id === item.ticketTypeId)!
          return { name: `FÉCOA 2026 — ${tt.name}`, price: item.unitPrice, quantity: item.quantity }
        })
        const session = await createStripeCheckoutSession({
          orderId: order.id,
          email,
          lineItems: lineItemsStripe,
          successUrl,
          cancelUrl,
        })
        paymentUrl = session.url
        paymentId = session.id
        break
      }
      case 'paypal': {
        const result = await createPayPalOrder({
          orderId: order.id,
          total,
        })
        const paypalLink = result.links?.find((l: { rel: string }) => l.rel === 'approve')
        paymentUrl = paypalLink?.href || null
        paymentId = result.id
        break
      }
      case 'orange_money': {
        const result = await createOrangeMoneyPayment({
          orderId: order.id,
          total,
          email,
        })
        paymentUrl = result.payment_url || result.pay_token ? `${result.payment_url}?token=${result.pay_token}` : null
        paymentId = result.pay_token || null
        break
      }
      case 'wave': {
        const result = await createWavePayment({
          orderId: order.id,
          total,
        })
        paymentUrl = result.wave_launch_url || null
        paymentId = result.id
        break
      }
    }

    // Mettre à jour la commande avec l'ID de paiement
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
    console.error('Erreur checkout:', error)
    return NextResponse.json(
      { error: 'Erreur serveur lors de la création de la commande' },
      { status: 500 }
    )
  }
}
