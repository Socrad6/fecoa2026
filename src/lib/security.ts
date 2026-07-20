export function sanitizeInput(input: string, maxLength: number): string {
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, '') // basic XSS prevention
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isCSRFTokenValid(token: string | null, sessionToken: string | null): boolean {
  if (!token || !sessionToken) return false
  return token === sessionToken
}

// CSRF token generation (simple double-submit cookie pattern)
export function generateCSRFToken(): string {
  return crypto.randomUUID()
}
