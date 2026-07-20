import { checkRateLimit, RATE_LIMITS } from '@/lib/rate-limit'

describe('Rate Limiting', () => {
  beforeEach(() => {
    // Reset by using fresh keys
  })

  it('allows requests within limit', () => {
    const key = `test-${Date.now()}-1`
    const result = checkRateLimit(key, { windowMs: 60000, maxRequests: 5 })
    expect(result.allowed).toBe(true)
    expect(result.remaining).toBe(4)
  })

  it('blocks requests over limit', () => {
    const key = `test-${Date.now()}-2`
    for (let i = 0; i < 5; i++) {
      checkRateLimit(key, { windowMs: 60000, maxRequests: 5 })
    }
    const result = checkRateLimit(key, { windowMs: 60000, maxRequests: 5 })
    expect(result.allowed).toBe(false)
    expect(result.remaining).toBe(0)
  })

  it('has correct presets', () => {
    expect(RATE_LIMITS.checkout.maxRequests).toBe(10)
    expect(RATE_LIMITS.newsletter.maxRequests).toBe(5)
    expect(RATE_LIMITS.contact.maxRequests).toBe(3)
    expect(RATE_LIMITS.login.maxRequests).toBe(5)
  })
})
