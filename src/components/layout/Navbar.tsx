'use client'

import { useState, useEffect } from 'react'
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
  const [open, setOpen] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 h-[68px] px-[clamp(16px,4vw,72px)] flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? theme === 'dark'
            ? 'bg-[rgba(6,21,36,.93)] backdrop-blur-xl shadow-[0_1px_0_var(--border)]'
            : 'bg-[rgba(245,243,239,.93)] backdrop-blur-xl shadow-[0_1px_0_var(--border)]'
          : ''
      }`}>
        <Link href="/" className="flex items-center gap-3">
          <div className="w-[38px] h-[38px] rounded-full border border-[rgba(200,155,60,.4)] p-0.5 flex-shrink-0">
            <Image src="/logo/LOGO_FECAO_SANS_FOND.png" alt="FÉCOA" width={34} height={34} className="w-full h-full object-contain rounded-full" />
          </div>
          <div>
            <span className="block font-display text-xl font-bold text-gold tracking-[3px] leading-tight">FÉCOA</span>
            <span className="block text-[9px] tracking-[2px] uppercase" style={{ color: 'var(--text-muted)' }}>Montréal 2026</span>
          </div>
        </Link>

        <ul className="hidden lg:flex gap-8 items-center list-none">
          {navLinks.map(l => (
            <li key={l.href}>
              <Link href={l.href} className="text-[11px] font-medium tracking-[2px] uppercase relative pb-1 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gold after:transition-[width] after:duration-300 hover:after:w-full" style={{ color: 'var(--text-main)' }}>
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/billetterie" className="px-5 py-[9px] border border-gold text-gold text-[11px] font-medium tracking-[2px] uppercase hover:bg-gold hover:text-navy transition-all">
              Acheter un billet
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="w-9 h-9 border flex items-center justify-center transition-all cursor-pointer"
            style={{ borderColor: 'var(--border)', color: 'var(--gold)' }}
            aria-label="Changer de thème"
          >
            {theme === 'dark' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>

          {/* Mobile hamburger */}
          <button className="lg:hidden flex flex-col gap-[5px] p-1.5 bg-transparent border-none cursor-pointer" onClick={() => setOpen(!open)} aria-label="Menu">
            <span className={`block w-[22px] h-[1.5px] bg-gold transition-all duration-300 ${open ? 'rotate-45 translate-x-[4.5px] translate-y-[4.5px]' : ''}`} />
            <span className={`block w-[22px] h-[1.5px] bg-gold transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-[22px] h-[1.5px] bg-gold transition-all duration-300 ${open ? '-rotate-45 translate-x-[4.5px] -translate-y-[4.5px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile nav */}
      <div className={`fixed inset-0 top-[68px] z-40 backdrop-blur-[22px] flex flex-col items-center justify-center gap-8 transition-opacity duration-300 lg:hidden ${
        theme === 'dark' ? 'bg-[rgba(6,21,36,.97)]' : 'bg-[rgba(245,243,239,.97)]'
      } ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {navLinks.map(l => (
          <Link key={l.href} href={l.href} className="font-display text-[30px] font-bold transition-colors" style={{ color: 'var(--text-main)' }} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
        <Link href="/billetterie" className="btn-gold mt-4" onClick={() => setOpen(false)}>
          Acheter un billet
        </Link>
        <span className="text-[11px] tracking-[3px] uppercase mt-8" style={{ color: 'var(--text-muted)' }}>17–20 Décembre 2026 · Montréal</span>
      </div>
    </>
  )
}
