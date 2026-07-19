'use client'

import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) setStatus('success')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <div className="w-14 h-14 rounded-full border-2 border-gold flex items-center justify-center mx-auto mb-4" style={{ animation: 'pulse-gold 2s infinite' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C89B3C" strokeWidth="2"><path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <p className="text-[15px] text-gold-2 font-semibold mb-1">Merci ! Vous êtes inscrit(e).</p>
        <p className="text-[13px]" style={{ color: 'var(--text-muted)' }}>Vous recevrez nos prochaines annonces par courriel.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-[460px] mx-auto">
      <input
        type="email"
        required
        placeholder="Votre courriel"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="flex-1 border text-sm px-5 py-3.5 outline-none transition-all duration-300 focus:border-gold focus:shadow-[0_0_0_3px_rgba(200,155,60,.1)]"
        style={{ background: 'var(--bg-3)', borderColor: 'var(--border)', color: 'var(--text-main)' }}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-gold !px-7 disabled:opacity-50"
      >
        {status === 'loading' ? '...' : "S'inscrire"}
      </button>
    </form>
  )
}
