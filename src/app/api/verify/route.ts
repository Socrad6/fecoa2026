import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'

const ctx = 'verify'

export async function GET(req: NextRequest) {
  const qr = req.nextUrl.searchParams.get('qr')

  if (!qr || qr.length > 100) {
    return new NextResponse('<html><body><h1>QR invalide</h1></body></html>', {
      status: 400,
      headers: { 'Content-Type': 'text/html' },
    })
  }

  try {
    const ticket = await prisma.ticket.findUnique({
      where: { qrCode: qr },
      include: { order: true, ticketType: true },
    })

    if (!ticket) {
      return new NextResponse(generateVerifyPage('QR Code non reconnu', 'error'), {
        status: 404,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      })
    }

    if (ticket.status === 'used') {
      return new NextResponse(generateVerifyPage('Billet déjà utilisé', 'warning', `Utilisé le ${ticket.checkedInAt?.toLocaleString('fr-CA')}`), {
        status: 409,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      })
    }

    if (ticket.status === 'cancelled') {
      return new NextResponse(generateVerifyPage('Billet annulé', 'error'), {
        status: 410,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      })
    }

    // Mark as used
    await prisma.ticket.update({
      where: { id: ticket.id },
      data: { status: 'used', checkedInAt: new Date() },
    })

    return new NextResponse(generateVerifyPage('Billet valide — Entrée autorisée', 'success', `${ticket.ticketType.name} — ${ticket.order.firstName} ${ticket.order.lastName}`), {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  } catch (error) {
    logger.error(ctx, 'Verify error', error)
    return new NextResponse(generateVerifyPage('Erreur serveur', 'error'), {
      status: 500,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  }
}

function generateVerifyPage(title: string, type: 'success' | 'error' | 'warning', detail?: string): string {
  const colors = {
    success: { bg: '#065f46', border: '#4ade80', text: '#4ade80' },
    error: { bg: '#7f1d1d', border: '#f87171', text: '#f87171' },
    warning: { bg: '#78350f', border: '#fbbf24', text: '#fbbf24' },
  }
  const c = colors[type]
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>FÉCOA 2026 — Vérification</title></head>
<body style="margin:0;padding:0;background:#061524;display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:system-ui,sans-serif;">
  <div style="text-align:center;padding:40px;max-width:400px;">
    <div style="width:80px;height:80px;border-radius:50%;border:3px solid ${c.border};display:flex;align-items:center;justify-content:center;margin:0 auto 24px;background:${c.bg};">
      <span style="font-size:36px;">${type === 'success' ? '✓' : type === 'warning' ? '!' : '✗'}</span>
    </div>
    <h1 style="margin:0 0 8px;font-size:20px;color:${c.text};">${title}</h1>
    ${detail ? `<p style="margin:0 0 24px;font-size:14px;color:#7a8fa8;">${detail}</p>` : ''}
    <p style="margin:0;font-size:11px;color:#7a8fa8;letter-spacing:2px;">FÉCOA 2026 — MONTRÉAL</p>
  </div>
</body>
</html>`
}
