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
  const [scrollProgress, setScrollProgress] = useState(0)
  const [open, setOpen] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const h = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(h > 0 ? (window.scrollY / h) * 100 : 0)
    }
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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass shadow-[0_1px_0_var(--border)]'
          : 'bg-transparent'
      }`}>
        <div className="max-w-[1440px] mx-auto h-[72px] px-[clamp(16px,4vw,48px)] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-[40px] h-[40px] rounded-full border border-[rgba(200,155,60,.3)] p-0.5 flex-shrink-0 transition-all duration-400 group-hover:border-gold group-hover:shadow-[0_0_20px_rgba(200,155,60,.25)]">
              <Image src="/logo/LOGO_FECAO_SANS_FOND.png" alt="FÉCOA" width={36} height={36} className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <span className="block font-display text-[22px] font-bold text-gold tracking-[4px] leading-tight">FÉCOA</span>
              <span className="block text-[9px] tracking-[2.5px] uppercase" style={{ color: 'var(--text-muted)' }}>Montréal 2026</span>
            </div>
          </Link>

          <ul className="hidden lg:flex gap-1 items-center list-none">
            {navLinks.map(l => (
              <li key={l.href}>
                <Link href={l.href} className="px-3.5 py-2 text-[11px] font-medium tracking-[1.5px] uppercase rounded-full transition-all duration-300 hover:bg-[rgba(200,155,60,.08)] hover:text-gold-2" style={{ color: 'var(--text-main)' }}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="ml-3">
              <Link href="/billetterie" className="btn-gold !py-2.5 !px-6 !text-[10px] !rounded-full">
                Billets
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer hover:bg-[rgba(200,155,60,.1)] hover:text-gold-2 border border-transparent hover:border-[rgba(200,155,60,.2)]"
              style={{ color: 'var(--gold)' }}
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
        </div>

        {/* Scroll progress bar */}
        <div className="h-[2px] w-full" style={{ background: 'var(--border)' }}>
          <div
            className="h-full transition-[width] duration-150"
            style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #C89B3C, #E8B84B)' }}
          />
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
