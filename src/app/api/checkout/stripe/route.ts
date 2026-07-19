import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getStripeClient, handleStripeWebhook } from '@/lib/payments/stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Signature manquante' }, { status: 400 })
  }

  try {
    const event = getStripeClient().webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )

    const result = await handleStripeWebhook(event)

    if (result?.orderId) {
      // Mettre à jour la commande
      await prisma.order.update({
        where: { id: result.orderId },
        data: { status: 'paid', paymentId: result.paymentId },
      })

      // Générer les billets
      const order = await prisma.order.findUnique({
        where: { id: result.orderId },
        include: { items: true },
      })

      if (order) {
        for (const item of order.items) {
          for (let i = 0; i < item.quantity; i++) {
            await prisma.ticket.create({
              data: {
                orderId: order.id,
                ticketTypeId: item.ticketTypeId,
                qrCode: crypto.randomUUID(),
                status: 'valid',
              },
            })
          }
        }
      }
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Webhook error:', err)
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 })
  }
}
