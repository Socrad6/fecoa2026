import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendTicketEmail } from '@/lib/email'
import { logger } from '@/lib/logger'

const ctx = 'wave-webhook'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    logger.info(ctx, 'Wave webhook received', { body })

    const eventType = body?.event_type || body?.type
    const session = body?.data || body?.session

    if (eventType !== 'checkout.session.completed') {
      logger.info(ctx, 'Ignoring Wave event', { eventType })
      return NextResponse.json({ status: 'ignored' })
    }

    const orderId = session?.reference || session?.id
    if (!orderId) {
      logger.warn(ctx, 'No orderId in Wave webhook')
      return NextResponse.json({ status: 'no_order_id' })
    }

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

    await prisma.$transaction(async (tx) => {
      await tx.order.update({
        where: { id: orderId },
        data: { status: 'paid', paymentId: session?.id || null },
      })

      const orderItems = await tx.orderItem.findMany({ where: { orderId } })

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

      logger.info(ctx, 'Order paid + tickets generated', { orderId, ticketCount: ticketData.length })
    })

    const paidOrder = await prisma.order.findUnique({
      where: { id: orderId },
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

    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    logger.error(ctx, 'Webhook processing error', error)
    return NextResponse.json({ status: 'error' }, { status: 500 })
  }
}
