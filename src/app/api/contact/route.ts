import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    await prisma.contactMessage.create({
      data: { name, email, subject: subject || null, message },
    })

    return NextResponse.json({ message: 'Message envoyé avec succès' })
  } catch (error) {
    console.error('Erreur contact:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
