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
        <div className="w-12 h-12 rounded-full border-2 border-gold flex items-center justify-center mx-auto mb-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C89B3C" strokeWidth="2"><path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <p className="text-[14px] text-gold-2 font-semibold">Merci ! Vous êtes inscrit(e).</p>
        <p className="text-[12px] text-muted mt-1">Vous recevrez nos prochaines annonces par courriel.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-[440px] mx-auto">
      <input
        type="email"
        required
        placeholder="Votre courriel"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="flex-1 bg-[rgba(255,255,255,.04)] border border-[rgba(200,155,60,.15)] text-text px-4 py-3 text-sm outline-none focus:border-gold transition-colors placeholder:text-muted"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-gold !px-6 disabled:opacity-50"
      >
        {status === 'loading' ? '...' : "S'inscrire"}
      </button>
    </form>
  )
}
