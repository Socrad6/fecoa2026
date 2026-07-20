'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface User { id: string; email: string; firstName: string; lastName: string; role: string }

const navItems = [
  { href: '/admin', label: 'Tableau de bord', icon: '📊' },
  { href: '/admin/commandes', label: 'Commandes', icon: '🛒' },
  { href: '/admin/exposants', label: 'Exposants', icon: '🏢' },
  { href: '/admin/sponsors', label: 'Sponsors', icon: '🤝' },
  { href: '/admin/presse', label: 'Presse', icon: '📰' },
  { href: '/admin/newsletter', label: 'Newsletter', icon: '📧' },
  { href: '/admin/messages', label: 'Messages', icon: '💬' },
  { href: '/admin/utilisateurs', label: 'Utilisateurs', icon: '👥' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(d => setUser(d.user))
      .catch(() => { window.location.href = '/admin/login' })
      .finally(() => setLoading(false))
  }, [])

  const handleLogout = useCallback(async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/admin/login'
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-bg)' }}>
        <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--color-bg)' }}>
      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 bottom-0 w-[260px] z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`} style={{ background: 'var(--color-bg-2)', borderRight: '1px solid var(--color-border)' }}>
        <div className="p-5 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <Link href="/admin" className="flex items-center gap-3">
            <span className="font-display text-[20px] font-bold text-gold tracking-[3px]">FÉCOA</span>
            <span className="text-[9px] font-bold tracking-[2px] uppercase px-2 py-0.5 rounded-full bg-[rgba(200,155,60,.12)] text-gold-2">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navItems.map(item => {
            const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 ${active ? 'bg-[rgba(200,155,60,.1)] text-gold-2' : 'hover:bg-[rgba(200,155,60,.05)]'}`}
                style={{ color: active ? undefined : 'var(--color-text)' }}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-[rgba(200,155,60,.12)] flex items-center justify-center text-[11px] font-bold text-gold">
              {user.firstName[0]}{user.lastName[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium truncate" style={{ color: 'var(--color-text)' }}>{user.firstName} {user.lastName}</p>
              <p className="text-[10px] truncate" style={{ color: 'var(--color-muted)' }}>{user.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full text-[11px] font-medium py-2 rounded-lg border transition-all hover:bg-[rgba(200,155,60,.06)]" style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}>
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="h-14 flex items-center px-5 border-b sticky top-0 z-30" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
          <button className="lg:hidden mr-3 p-1" onClick={() => setSidebarOpen(true)} aria-label="Ouvrir le menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          </button>
          <h1 className="text-[13px] font-semibold" style={{ color: 'var(--color-text)' }}>
            {navItems.find(n => n.href === pathname)?.label || 'Administration'}
          </h1>
        </header>

        <main className="p-5 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
