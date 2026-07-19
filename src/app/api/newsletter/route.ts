import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Courriel invalide' }, { status: 400 })
    }

    const existing = await prisma.newsletter.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ message: 'Déjà inscrit à la newsletter' })
    }

    await prisma.newsletter.create({
      data: { email, confirmed: true },
    })

    return NextResponse.json({ message: 'Inscription à la newsletter réussie' })
  } catch (error) {
    console.error('Erreur newsletter:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
