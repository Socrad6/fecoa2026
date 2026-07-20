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
      <div className="text-center py-12" style={{ animation: 'newsletterSuccess .6s var(--ease-spring) forwards' }}>
        <div
          className="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center mx-auto mb-5"
          style={{ animation: 'checkBounce .6s var(--ease-spring) .15s both' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C89B3C" strokeWidth="2.5" aria-hidden="true"><path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <p className="text-[16px] text-gold-2 font-semibold mb-1.5" style={{ animation: 'fadeUp .5s var(--ease-out) .3s both' }}>Merci ! Vous êtes inscrit(e).</p>
        <p className="text-[13px]" style={{ color: 'var(--color-muted)', animation: 'fadeUp .5s var(--ease-out) .4s both' }}>Vous recevrez nos prochaines annonces par courriel.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-[460px] mx-auto relative" aria-label="Inscription newsletter">
      <label className="sr-only" htmlFor="newsletter-email">Courriel</label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="Votre courriel"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="newsletter-input flex-1 border text-sm px-5 py-3.5 outline-none transition-all duration-300 rounded-full"
        style={{ background: 'var(--color-bg-3)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
        aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
      />
      <button type="submit" disabled={status === 'loading'} className="btn-gold !px-7 disabled:opacity-50">
        {status === 'loading' ? (
          <span className="inline-flex items-center gap-2">
            <span className="w-3.5 h-3.5 border-2 border-navy border-t-transparent rounded-full" style={{ animation: 'spin .7s linear infinite' }} />
            <span className="sr-only">Envoi…</span>
          </span>
        ) : "S'inscrire"}
      </button>
      {status === 'error' && (
        <p id="newsletter-error" className="text-red-400 text-xs absolute -bottom-7 left-0" style={{ animation: 'fadeUp .3s var(--ease-out)' }}>
          Erreur. Veuillez réessayer.
        </p>
      )}
    </form>
  )
}
