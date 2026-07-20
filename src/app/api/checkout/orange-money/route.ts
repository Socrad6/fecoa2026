import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendTicketEmail } from '@/lib/email'
import { logger } from '@/lib/logger'

const ctx = 'orange-money-webhook'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    logger.info(ctx, 'Orange Money webhook received', { body })

    const { order_id, status, pay_token } = body as {
      order_id?: string
      status?: string
      pay_token?: string
    }

    if (!order_id) {
      logger.warn(ctx, 'No order_id in webhook payload')
      return NextResponse.json({ status: 'no_order_id' })
    }

    if (status !== 'SUCCESS') {
      logger.info(ctx, 'Orange Money payment not successful', { orderId: order_id, status })
      return NextResponse.json({ status: 'payment_not_successful' })
    }

    const existingOrder = await prisma.order.findUnique({
      where: { id: order_id },
      include: { tickets: true },
    })

    if (!existingOrder) {
      logger.warn(ctx, 'Order not found', { orderId: order_id })
      return NextResponse.json({ status: 'order_not_found' })
    }

    if (existingOrder.status === 'paid' && existingOrder.tickets.length > 0) {
      logger.info(ctx, 'Order already processed (idempotent skip)', { orderId: order_id })
      return NextResponse.json({ status: 'already_processed' })
    }

    await prisma.$transaction(async (tx) => {
      await tx.order.update({
        where: { id: order_id },
        data: { status: 'paid', paymentId: pay_token || null },
      })

      const orderItems = await tx.orderItem.findMany({ where: { orderId: order_id } })

      const ticketData = orderItems.flatMap(item =>
        Array.from({ length: item.quantity }, () => ({
          orderId: order_id,
          ticketTypeId: item.ticketTypeId,
          qrCode: crypto.randomUUID(),
          status: 'valid' as const,
        }))
      )

      if (ticketData.length > 0) {
        await tx.ticket.createMany({ data: ticketData })
      }

      logger.info(ctx, 'Order paid + tickets generated', { orderId: order_id, ticketCount: ticketData.length })
    })

    const paidOrder = await prisma.order.findUnique({
      where: { id: order_id },
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
