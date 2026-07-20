import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getStripeClient, handleStripeWebhook } from '@/lib/payments/stripe'
import { sendTicketEmail } from '@/lib/email'
import { logger } from '@/lib/logger'

const ctx = 'stripe-webhook'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    logger.warn(ctx, 'Missing signature or webhook secret')
    return NextResponse.json({ error: 'Signature manquante' }, { status: 400 })
  }

  let event
  try {
    event = getStripeClient().webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    logger.error(ctx, 'Webhook signature verification failed', err)
    return NextResponse.json({ error: 'Signature invalide' }, { status: 400 })
  }

  logger.info(ctx, 'Webhook received', { type: event.type, eventId: event.id })

  try {
    const result = await handleStripeWebhook(event)

    if (!result?.orderId) {
      return NextResponse.json({ received: true })
    }

    // ── Idempotency: check if order is already paid ──
    const existingOrder = await prisma.order.findUnique({
      where: { id: result.orderId },
      include: { tickets: true },
    })

    if (!existingOrder) {
      logger.warn(ctx, 'Order not found for webhook', { orderId: result.orderId })
      return NextResponse.json({ received: true })
    }

    if (existingOrder.status === 'paid' && existingOrder.tickets.length > 0) {
      logger.info(ctx, 'Order already processed (idempotent skip)', { orderId: result.orderId })
      return NextResponse.json({ received: true })
    }

    // ── Atomic transaction: update order + create tickets ──
    await prisma.$transaction(async (tx) => {
      await tx.order.update({
        where: { id: result.orderId },
        data: { status: 'paid', paymentId: result.paymentId },
      })

      const orderItems = await tx.orderItem.findMany({
        where: { orderId: result.orderId },
      })

      const ticketData = orderItems.flatMap(item =>
        Array.from({ length: item.quantity }, () => ({
          orderId: result.orderId,
          ticketTypeId: item.ticketTypeId,
          qrCode: crypto.randomUUID(),
          status: 'valid' as const,
        }))
      )

      if (ticketData.length > 0) {
        await tx.ticket.createMany({ data: ticketData })
      }

      logger.info(ctx, 'Order paid + tickets generated', {
        orderId: result.orderId,
        ticketCount: ticketData.length,
      })
    })

    // ── Send ticket email ──
    const paidOrder = await prisma.order.findUnique({
      where: { id: result.orderId },
      include: { items: { include: { ticketType: true } }, tickets: { include: { ticketType: true } } },
    })
    if (paidOrder) {
      sendTicketEmail({
        to: paidOrder.email,
        firstName: paidOrder.firstName,
        orderId: paidOrder.id,
        items: paidOrder.items.map(i => ({ name: i.ticketType.name, quantity: i.quantity, unitPrice: i.unitPrice })),
        total: paidOrder.total,
        tickets: paidOrder.tickets.map(t => ({ type: t.ticketType.name, qrCode: t.qrCode })),
      }).catch(e => logger.error(ctx, 'Failed to send ticket email', e))
    }
  } catch (err) {
    logger.error(ctx, 'Webhook processing error', err)
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
