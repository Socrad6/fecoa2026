'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Erreur'); return }
      if (data.user.role !== 'admin') { setError('Accès réservé aux administrateurs'); return }
      router.push('/admin')
    } catch { setError('Erreur de connexion') }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--color-bg)' }}>
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-8">
          <span className="font-display text-[32px] font-bold text-gold tracking-[4px]">FÉCOA</span>
          <p className="text-[11px] tracking-[3px] uppercase mt-1" style={{ color: 'var(--color-muted)' }}>Administration</p>
        </div>

        <form onSubmit={handleSubmit} className="glass p-8 space-y-5">
          <div>
            <label className="block text-[11px] font-bold tracking-[1px] uppercase mb-2" style={{ color: 'var(--color-muted)' }}>Courriel</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 text-sm outline-none transition-all focus:border-gold focus:shadow-[0_0_0_3px_rgba(200,155,60,.1)]"
              style={{ background: 'var(--color-bg-3)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} />
          </div>
          <div>
            <label className="block text-[11px] font-bold tracking-[1px] uppercase mb-2" style={{ color: 'var(--color-muted)' }}>Mot de passe</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 text-sm outline-none transition-all focus:border-gold focus:shadow-[0_0_0_3px_rgba(200,155,60,.1)]"
              style={{ background: 'var(--color-bg-3)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} />
          </div>
          {error && <p className="text-red-400 text-[12px]">{error}</p>}
          <button type="submit" disabled={loading} className="btn-gold w-full justify-center disabled:opacity-50">
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  )
}
