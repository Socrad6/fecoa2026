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
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 h-[72px] px-[clamp(16px,4vw,72px)] flex items-center justify-between transition-all duration-500 ${
        scrolled
          ? 'glass shadow-[0_1px_0_var(--border)]'
          : 'bg-transparent'
      }`}>
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-[40px] h-[40px] rounded-full border border-[rgba(200,155,60,.35)] p-0.5 flex-shrink-0 transition-all duration-300 group-hover:border-gold group-hover:shadow-[0_0_16px_rgba(200,155,60,.2)]">
            <Image src="/logo/LOGO_FECAO_SANS_FOND.png" alt="FÉCOA" width={36} height={36} className="w-full h-full object-contain rounded-full" />
          </div>
          <div>
            <span className="block font-display text-[22px] font-bold text-gold tracking-[4px] leading-tight">FÉCOA</span>
            <span className="block text-[9px] tracking-[2.5px] uppercase" style={{ color: 'var(--text-muted)' }}>Montréal 2026</span>
          </div>
        </Link>

        <ul className="hidden lg:flex gap-10 items-center list-none">
          {navLinks.map(l => (
            <li key={l.href}>
              <Link href={l.href} className="text-[11px] font-medium tracking-[2px] uppercase relative pb-1.5 transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-px after:bg-gold after:transition-all after:duration-300 hover:after:w-full" style={{ color: 'var(--text-main)' }}>
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/billetterie" className="px-6 py-2.5 border border-gold/40 text-gold text-[11px] font-semibold tracking-[2px] uppercase hover:bg-gold hover:text-navy transition-all duration-300 hover:shadow-[0_4px_20px_rgba(200,155,60,.25)]">
              Acheter un billet
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="w-10 h-10 border flex items-center justify-center transition-all duration-300 cursor-pointer hover:border-gold hover:text-gold-2 hover:shadow-[0_0_12px_rgba(200,155,60,.15)]"
            style={{ borderColor: 'var(--border)', color: 'var(--gold)' }}
            aria-label="Changer de thème"
          >
            {theme === 'dark' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>

          <button className="lg:hidden flex flex-col gap-[5px] p-2 bg-transparent border-none cursor-pointer" onClick={() => setOpen(!open)} aria-label="Menu">
            <span className={`block w-[22px] h-[1.5px] bg-gold transition-all duration-400 origin-center ${open ? 'rotate-45 translate-x-[3.5px] translate-y-[3.5px]' : ''}`} />
            <span className={`block w-[22px] h-[1.5px] bg-gold transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-[22px] h-[1.5px] bg-gold transition-all duration-400 origin-center ${open ? '-rotate-45 translate-x-[3.5px] -translate-y-[3.5px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile nav overlay */}
      <div className={`fixed inset-0 top-[72px] z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 lg:hidden ${
        theme === 'dark' ? 'bg-[rgba(6,21,36,.98)]' : 'bg-[rgba(250,249,247,.98)]'
      } ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className={`flex flex-col items-center gap-6 transition-all duration-500 ${open ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {navLinks.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-display text-[32px] font-bold transition-colors duration-300 hover:text-gold-2"
              style={{ color: 'var(--text-main)', transitionDelay: open ? `${i * 50}ms` : '0ms' }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/billetterie" className="btn-gold mt-4" onClick={() => setOpen(false)}>
            Acheter un billet
          </Link>
          <span className="text-[11px] tracking-[3px] uppercase mt-6" style={{ color: 'var(--text-muted)' }}>17–20 Décembre 2026 · Montréal</span>
        </div>
      </div>
    </>
  )
}
