import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { capturePayPalOrder } from '@/lib/payments/paypal'
import { logger } from '@/lib/logger'

const ctx = 'paypal-webhook'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const eventType = body?.event_type
    const resource = body?.resource

    logger.info(ctx, 'PayPal webhook received', { eventType, resourceId: resource?.id })

    if (eventType !== 'CHECKOUT.ORDER.APPROVED') {
      logger.debug(ctx, `Ignoring event type: ${eventType}`)
      return NextResponse.json({ status: 'ignored' })
    }

    // Extract orderId from reference_id or custom_id
    const orderId = resource?.purchase_units?.[0]?.reference_id
      || resource?.custom_id

    if (!orderId) {
      logger.warn(ctx, 'No orderId found in PayPal webhook payload')
      return NextResponse.json({ status: 'no_order_id' })
    }

    // Idempotency check
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
      include: { tickets: true },
    })

    if (!existingOrder) {
      logger.warn(ctx, 'Order not found', { orderId })
      return NextResponse.json({ status: 'order_not_found' })
    }

    if (existingOrder.status === 'paid' && existingOrder.tickets.length > 0) {
      logger.info(ctx, 'Order already processed (idempotent skip)', { orderId })
      return NextResponse.json({ status: 'already_processed' })
    }

    // Capture the PayPal order
    if (resource?.id) {
      try {
        await capturePayPalOrder(resource.id)
      } catch (captureErr) {
        logger.error(ctx, 'PayPal capture failed', captureErr)
        return NextResponse.json({ status: 'capture_error' }, { status: 500 })
      }
    }

    // Atomic transaction: update order + create tickets
    await prisma.$transaction(async (tx) => {
      await tx.order.update({
        where: { id: orderId },
        data: { status: 'paid', paymentId: resource?.id || null },
      })

      const orderItems = await tx.orderItem.findMany({
        where: { orderId },
      })

      const ticketData = orderItems.flatMap(item =>
        Array.from({ length: item.quantity }, () => ({
          orderId,
          ticketTypeId: item.ticketTypeId,
          qrCode: crypto.randomUUID(),
          status: 'valid' as const,
        }))
      )

      if (ticketData.length > 0) {
        await tx.ticket.createMany({ data: ticketData })
      }

      logger.info(ctx, 'Order paid + tickets generated', {
        orderId,
        ticketCount: ticketData.length,
      })
    })

    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    logger.error(ctx, 'Webhook processing error', error)
    return NextResponse.json({ status: 'error' }, { status: 500 })
  }
}
