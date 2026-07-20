'use client'

import { useState, useCallback } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }, [email])

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <div className="w-14 h-14 rounded-full border-2 border-gold flex items-center justify-center mx-auto mb-4" style={{ animation: 'pulse-gold 2s infinite' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C89B3C" strokeWidth="2" aria-hidden="true"><path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <p className="text-[15px] text-gold-2 font-semibold mb-1">Merci ! Vous êtes inscrit(e).</p>
        <p className="text-[13px]" style={{ color: 'var(--color-muted)' }}>Vous recevrez nos prochaines annonces par courriel.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-[460px] mx-auto" aria-label="Inscription newsletter">
      <label className="sr-only" htmlFor="newsletter-email">Courriel</label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="Votre courriel"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="flex-1 border text-sm px-5 py-3.5 outline-none transition-all duration-300 focus:border-gold focus:shadow-[0_0_0_3px_rgba(200,155,60,.1)] rounded-full"
        style={{ background: 'var(--color-bg-3)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
        aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
      />
      <button type="submit" disabled={status === 'loading'} className="btn-gold !px-7 disabled:opacity-50">
        {status === 'loading' ? '...' : "S'inscrire"}
      </button>
      {status === 'error' && <p id="newsletter-error" className="text-red-400 text-xs mt-2 absolute">Erreur. Veuillez réessayer.</p>}
    </form>
  )
}
