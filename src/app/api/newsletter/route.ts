import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'

const ctx = 'newsletter'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
      return NextResponse.json({ error: 'Courriel invalide' }, { status: 400 })
    }

    const cleanEmail = email.trim().toLowerCase().slice(0, 254)

    const existing = await prisma.newsletter.findUnique({ where: { email: cleanEmail } })
    if (existing) {
      return NextResponse.json({ message: 'Déjà inscrit à la newsletter' })
    }

    await prisma.newsletter.create({
      data: { email: cleanEmail, confirmed: true },
    })

    logger.info(ctx, 'New subscriber', { email: cleanEmail })
    return NextResponse.json({ message: 'Inscription à la newsletter réussie' })
  } catch (error) {
    logger.error(ctx, 'Newsletter error', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
