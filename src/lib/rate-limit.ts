// Rate limiting using in-memory store (replace with Redis in production)

interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of store) {
    if (entry.resetAt < now) store.delete(key)
  }
}, 300000)

export interface RateLimitConfig {
  windowMs: number
  maxRequests: number
}

export function checkRateLimit(
  key: string,
  config: RateLimitConfig
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || entry.resetAt < now) {
    const resetAt = now + config.windowMs
    store.set(key, { count: 1, resetAt })
    return { allowed: true, remaining: config.maxRequests - 1, resetAt }
  }

  entry.count++
  const remaining = Math.max(0, config.maxRequests - entry.count)

  return { allowed: remaining > 0, remaining, resetAt: entry.resetAt }
}

// Presets
export const RATE_LIMITS = {
  checkout: { windowMs: 15 * 60 * 1000, maxRequests: 10 },       // 10 per 15min
  newsletter: { windowMs: 60 * 60 * 1000, maxRequests: 5 },       // 5 per hour
  contact: { windowMs: 60 * 60 * 1000, maxRequests: 3 },          // 3 per hour
  login: { windowMs: 15 * 60 * 1000, maxRequests: 5 },            // 5 per 15min
  tickets: { windowMs: 60 * 60 * 1000, maxRequests: 30 },         // 30 per hour
  default: { windowMs: 60 * 60 * 1000, maxRequests: 60 },         // 60 per hour
}

export function rateLimitResponse(resetAt: number): Response {
  const retryAfter = Math.ceil((resetAt - Date.now()) / 1000)
  return Response.json(
    { error: 'Trop de requêtes. Veuillez réessayer plus tard.' },
    {
      status: 429,
      headers: {
        'Retry-After': String(retryAfter),
        'X-RateLimit-Reset': String(resetAt),
      },
    }
  )
}
