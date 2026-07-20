'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from '@/components/ui/ThemeProvider'

const navLinks = [
  { href: '/#about', label: 'L\'événement' },
  { href: '/programme', label: 'Programme' },
  { href: '/billetterie', label: 'Billetterie' },
  { href: '/exposants', label: 'Exposants' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/presse', label: 'Presse' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, toggle } = useTheme()

  const onScroll = useCallback(() => {
    const y = window.scrollY
    setScrolled(y > 40)
    const h = document.documentElement.scrollHeight - window.innerHeight
    setScrollProgress(h > 0 ? (y / h) * 100 : 0)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <>
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[600] focus:px-4 focus:py-2 focus:bg-gold focus:text-navy focus:rounded-full focus:text-sm focus:font-semibold"
      >
        Aller au contenu principal
      </a>

      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[var(--ease-smooth)] ${
          scrolled
            ? 'glass shadow-[0_1px_0_var(--color-border)] backdrop-blur-xl'
            : 'bg-transparent backdrop-blur-none'
        }`}
      >
        <nav
          aria-label="Navigation principale"
          className="max-w-[1440px] mx-auto h-[72px] px-[clamp(16px,4vw,48px)] flex items-center justify-between"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="FÉCOA — Accueil">
            <div className="w-[40px] h-[40px] rounded-full border border-[rgba(200,155,60,.25)] p-0.5 flex-shrink-0 transition-all duration-400 group-hover:border-gold group-hover:shadow-[0_0_20px_rgba(200,155,60,.25)]">
              <Image src="/logo/LOGO_FECAO_SANS_FOND.png" alt="" width={36} height={36} className="w-full h-full object-contain rounded-full" priority />
            </div>
            <div className="leading-none">
              <span className="block font-display text-[22px] font-bold text-gold tracking-[4px]">FÉCOA</span>
              <span className="block text-[9px] tracking-[2.5px] uppercase mt-0.5" style={{ color: 'var(--color-muted)' }}>Montréal 2026</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex gap-0.5 items-center" role="list">
            {navLinks.map(link => (
              <li key={link.href} className="group/nav relative">
                <Link
                  href={link.href}
                  className="nav-pill px-3.5 py-2 text-[11px] font-medium tracking-[.12em] uppercase rounded-full transition-all duration-300 hover:bg-[rgba(200,155,60,.08)] hover:text-gold-2 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
                  style={{ color: 'var(--color-text)' }}
                >
                  {link.label}
                </Link>
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-gold transition-all duration-300 group-hover/nav:w-[60%] rounded-full" aria-hidden="true" />
              </li>
            ))}
            <li className="ml-2">
              <Link href="/billetterie" className="btn-gold !py-2.5 !px-6 !text-[10px] hover:shadow-[0_0_24px_rgba(200,155,60,.4)]">
                Billets
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 7h10M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
              </Link>
            </li>
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[rgba(200,155,60,.1)] hover:text-gold-2 border border-transparent hover:border-[rgba(200,155,60,.15)] focus-visible:ring-2 focus-visible:ring-gold"
              style={{ color: 'var(--gold)' }}
              aria-label={`Passer en mode ${theme === 'dark' ? 'clair' : 'sombre'}`}
            >
              {theme === 'dark' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex flex-col gap-[5px] p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <span className={`block w-[22px] h-[1.5px] bg-gold transition-all duration-400 origin-center ${mobileOpen ? 'rotate-45 translate-x-[3.5px] translate-y-[3.5px]' : ''}`} />
              <span className={`block w-[22px] h-[1.5px] bg-gold transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block w-[22px] h-[1.5px] bg-gold transition-all duration-400 origin-center ${mobileOpen ? '-rotate-45 translate-x-[3.5px] -translate-y-[3.5px]' : ''}`} />
            </button>
          </div>
        </nav>

        {/* Scroll progress */}
        <div className="h-[2px] w-full" style={{ background: 'var(--color-border)' }} aria-hidden="true">
          <div
            className="h-full transition-[width] duration-150"
            style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #C89B3C, #E8B84B)' }}
          />
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu mobile"
        className={`fixed inset-0 top-[74px] z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 lg:hidden ${
          theme === 'dark' ? 'bg-[rgba(6,21,36,.98)]' : 'bg-[rgba(250,249,247,.98)]'
        } ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className={`flex flex-col items-center gap-6 transition-all duration-500 ${mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-[32px] font-bold transition-colors duration-300 hover:text-gold-2 focus-visible:text-gold-2"
              style={{ color: 'var(--color-text)', transitionDelay: mobileOpen ? `${i * 50}ms` : '0ms' }}
              onClick={() => setMobileOpen(false)}
              tabIndex={mobileOpen ? 0 : -1}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/billetterie" className="btn-gold mt-4" onClick={() => setMobileOpen(false)} tabIndex={mobileOpen ? 0 : -1}>
            Acheter un billet
          </Link>
          <span className="text-[11px] tracking-[3px] uppercase mt-6" style={{ color: 'var(--color-muted)' }}>
            17–20 Décembre 2026 · Montréal
          </span>
        </div>
      </div>
    </>
  )
}
