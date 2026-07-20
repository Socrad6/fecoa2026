import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyPassword, createToken, setAuthCookie } from '@/lib/auth'
import { logger } from '@/lib/logger'

const ctx = 'login'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email et mot de passe requis' }, { status: 400 })
    }

    const cleanEmail = String(email).trim().toLowerCase().slice(0, 254)

    const user = await prisma.user.findUnique({
      where: { email: cleanEmail },
      select: { id: true, email: true, firstName: true, lastName: true, role: true, passwordHash: true },
    })

    if (!user || !user.passwordHash) {
      logger.warn(ctx, 'Login failed: user not found', { email: cleanEmail })
      return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 })
    }

    const valid = await verifyPassword(password, user.passwordHash)
    if (!valid) {
      logger.warn(ctx, 'Login failed: wrong password', { email: cleanEmail })
      return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 })
    }

    const token = createToken({ id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role })

    logger.info(ctx, 'Login successful', { email: cleanEmail, role: user.role })

    const response = NextResponse.json({
      user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role },
    })

    const cookieHeader = setAuthCookie(token)
    response.headers.set('Set-Cookie', cookieHeader['Set-Cookie'])

    return response
  } catch (error) {
    logger.error(ctx, 'Login error', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
