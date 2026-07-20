import { sanitizeInput, isValidEmail } from '@/lib/security'

describe('Security', () => {
  describe('sanitizeInput', () => {
    it('trims and limits length', () => {
      expect(sanitizeInput('  hello  ', 10)).toBe('hello')
      expect(sanitizeInput('a'.repeat(20), 10)).toBe('a'.repeat(10))
    })

    it('removes angle brackets', () => {
      expect(sanitizeInput('<script>alert(1)</script>', 100)).toBe('scriptalert(1)/script')
    })
  })

  describe('isValidEmail', () => {
    it('validates correct emails', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
      expect(isValidEmail('user.name+tag@domain.co')).toBe(true)
    })

    it('rejects invalid emails', () => {
      expect(isValidEmail('')).toBe(false)
      expect(isValidEmail('not-an-email')).toBe(false)
      expect(isValidEmail('@domain.com')).toBe(false)
      expect(isValidEmail('user@')).toBe(false)
    })
  })
})
