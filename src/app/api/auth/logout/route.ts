import { NextResponse } from 'next/server'
import { clearAuthCookie } from '@/lib/auth'
import { logger } from '@/lib/logger'

export async function POST() {
  logger.info('logout', 'User logged out')
  const response = NextResponse.json({ message: 'Déconnexion réussie' })
  const cookieHeader = clearAuthCookie()
  response.headers.set('Set-Cookie', cookieHeader['Set-Cookie'])
  return response
}
