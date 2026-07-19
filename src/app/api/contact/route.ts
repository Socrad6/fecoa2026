import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'

const ctx = 'contact'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    const cleanName = String(name).trim().slice(0, 100)
    const cleanEmail = String(email).trim().toLowerCase().slice(0, 254)
    const cleanSubject = subject ? String(subject).trim().slice(0, 200) : null
    const cleanMessage = String(message).trim().slice(0, 5000)

    if (!EMAIL_RE.test(cleanEmail)) {
      return NextResponse.json({ error: 'Courriel invalide' }, { status: 400 })
    }

    if (cleanMessage.length < 10) {
      return NextResponse.json({ error: 'Message trop court (10 caractères minimum)' }, { status: 400 })
    }

    await prisma.contactMessage.create({
      data: { name: cleanName, email: cleanEmail, subject: cleanSubject, message: cleanMessage },
    })

    logger.info(ctx, 'New contact message', { name: cleanName, email: cleanEmail, subject: cleanSubject })
    return NextResponse.json({ message: 'Message envoyé avec succès' })
  } catch (error) {
    logger.error(ctx, 'Contact error', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
