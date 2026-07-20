import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger'

const ctx = 'auth'
const JWT_SECRET = process.env.JWT_SECRET || 'fecoa2026-dev-secret-change-in-production'
const COOKIE_NAME = 'fecoa_token'
const TOKEN_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export interface AuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function createToken(user: AuthUser): string {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: TOKEN_MAX_AGE }
  )
}

export function verifyToken(token: string): AuthUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthUser
  } catch {
    return null
  }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(COOKIE_NAME)?.value
    if (!token) return null

    const payload = verifyToken(token)
    if (!payload) return null

    // Verify user still exists in DB
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { id: true, email: true, firstName: true, lastName: true, role: true },
    })

    return user as AuthUser | null
  } catch (err) {
    logger.error(ctx, 'getCurrentUser error', err)
    return null
  }
}

export function setAuthCookie(token: string) {
  return {
    'Set-Cookie': `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${TOKEN_MAX_AGE}; ${process.env.NODE_ENV === 'production' ? 'Secure; ' : ''}`,
  }
}

export function clearAuthCookie() {
  return {
    'Set-Cookie': `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; ${process.env.NODE_ENV === 'production' ? 'Secure; ' : ''}`,
  }
}

export function requireAdmin(user: AuthUser | null): boolean {
  return user !== null && user.role === 'admin'
}
