import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get('order')

  if (!orderId) {
    return NextResponse.json({ error: 'Order ID requis' }, { status: 400 })
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: { include: { ticketType: true } },
        tickets: { include: { ticketType: true } },
      },
    })

    if (!order) {
      return NextResponse.json({ error: 'Commande non trouvée' }, { status: 404 })
    }

    return NextResponse.json({
      orderId: order.id,
      status: order.status,
      email: order.email,
      firstName: order.firstName,
      lastName: order.lastName,
      subtotal: order.subtotal,
      discount: order.discount,
      total: order.total,
      promoCode: order.promoCode,
      paymentMethod: order.paymentMethod,
      items: order.items.map(item => ({
        name: item.ticketType.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        lineTotal: item.unitPrice * item.quantity,
      })),
      tickets: order.tickets.map(ticket => ({
        id: ticket.id,
        qrCode: ticket.qrCode,
        status: ticket.status,
        type: ticket.ticketType.name,
      })),
      createdAt: order.createdAt,
    })
  } catch (error) {
    console.error('Erreur récupération commande:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
