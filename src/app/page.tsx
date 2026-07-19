'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import HeroCanvas from '@/components/home/HeroCanvas'
import Ticker from '@/components/home/Ticker'
import Countdown from '@/components/ui/Countdown'
import Newsletter from '@/components/ui/Newsletter'

const nations = [
  { code: 'SN', name: 'Sénégal', color: '#1A7A3C', emoji: '🇸🇳' },
  { code: 'GN', name: 'Guinée', color: '#C0392B', emoji: '🇬🇳' },
  { code: 'ML', name: 'Mali', color: '#C89B3C', emoji: '🇲🇱' },
  { code: 'CA', name: 'Diaspora', color: '#D52B1E', emoji: '🍁' },
]

const pillars = [
  { icon: '◆', title: 'Commerce & Investissement', desc: 'Forum B2B, matchmaking, opportunités Canada-Afrique', color: '#1A5276' },
  { icon: '◇', title: 'Culture & Patrimoine', desc: 'Artisanat, musique, gastronomie, mode africaine', color: '#C89B3C' },
  { icon: '●', title: 'Diaspora & Communauté', desc: 'Solidarité, rencontres, 500 000 Africains au Canada', color: '#1A7A3C' },
  { icon: '▲', title: 'Innovation & Jeunesse', desc: 'Startups, pitches, incubateurs, entrepreneurs <35 ans', color: '#C0392B' },
]

const stats = [
  { num: 5000, suffix: '+', label: 'Visiteurs', color: '#C89B3C' },
  { num: 250, suffix: '+', label: 'Exposants', color: '#1A5276' },
  { num: 500, suffix: '+', label: 'Rencontres B2B', color: '#1A7A3C' },
  { num: 4, suffix: '', label: 'Nations', color: '#C0392B' },
  { num: 50, suffix: '+', label: 'Conférences', color: '#E67E22' },
  { num: 4, suffix: '', label: 'Jours', color: '#7D3C98' },
]

function useCountUp(target: number, duration = 2000, active = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = 0
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      setVal(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [active, target, duration])
  return val
}

function StatCard({ s, index }: { s: typeof stats[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const count = useCountUp(s.num, 1800 + index * 200, visible)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="bento-item p-6 sm:p-8 flex flex-col justify-center text-center min-h-[140px]"
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <span className="block font-display text-[clamp(36px,4vw,56px)] font-bold leading-none" style={{ color: s.color }}>
        {count.toLocaleString()}{s.suffix}
      </span>
      <small className="block text-[10px] font-semibold tracking-[2px] uppercase mt-3" style={{ color: 'var(--text-muted)' }}>{s.label}</small>
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      {/* ═══════ HERO ═══════ */}
      <section id="home" className="relative min-h-[100svh] overflow-hidden flex items-center px-[clamp(20px,5vw,80px)] pt-28 pb-20">
        <HeroCanvas />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(6,21,36,.92)] via-[rgba(6,21,36,.55)] to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,21,36,.65)] via-transparent to-[rgba(6,21,36,.25)] pointer-events-none" />

        <div className="absolute left-0 top-0 bottom-0 w-[3px] flex flex-col">
          {['#C89B3C', '#C0392B', '#1A7A3C', '#1A5276', '#C89B3C', '#C0392B', '#1A7A3C', '#1A5276'].map((c, i) => (
            <span key={i} style={{ background: c }} className="flex-1" />
          ))}
        </div>

        <div className="relative z-10 max-w-[1400px] w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-center">
            {/* Left: Text */}
            <div>
              <p className="eyebrow">
                17 – 20 Décembre 2026 · Montréal, Canada
              </p>

              <h1 className="font-display text-[clamp(44px,7vw,96px)] font-bold leading-[.92] tracking-[-1px] text-white mb-6">
                <span className="block animate-[fadeUp_.85s_cubic-bezier(.16,1,.3,1)_forwards] opacity-0" style={{ animationDelay: '0s' }}>Foire</span>
                <span className="block text-gold-2 animate-[fadeUp_.85s_cubic-bezier(.16,1,.3,1)_forwards] opacity-0" style={{ animationDelay: '.12s' }}>Économique</span>
                <span className="block animate-[fadeUp_.85s_cubic-bezier(.16,1,.3,1)_forwards] opacity-0" style={{ animationDelay: '.24s' }}>Ouest-Africaine</span>
              </h1>

              <p className="text-[clamp(11px,1.2vw,13px)] tracking-[3px] uppercase mb-3 animate-[fadeUp_.8s_cubic-bezier(.16,1,.3,1)_forwards] opacity-0" style={{ animationDelay: '.42s', color: 'var(--text-muted)' }}>
                Sénégal · Guinée · Mali · Diaspora
              </p>

              <p className="text-[clamp(14px,1.4vw,17px)] max-w-[440px] leading-[1.9] mb-10 animate-[fadeUp_.8s_cubic-bezier(.16,1,.3,1)_forwards] opacity-0 font-light" style={{ animationDelay: '.54s', color: 'var(--text-muted)' }}>
                Quatre jours d&apos;échanges commerciaux, de culture et de rencontres entre l&apos;Afrique de l&apos;Ouest et le Canada.
              </p>

              <div className="flex gap-3 flex-wrap mb-12 animate-[fadeUp_.8s_cubic-bezier(.16,1,.3,1)_forwards] opacity-0" style={{ animationDelay: '.66s' }}>
                <Link href="/billetterie" className="btn-gold !rounded-full">
                  Acheter un billet
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                </Link>
                <Link href="/programme" className="btn-outline !rounded-full">Voir le programme</Link>
              </div>

              <div className="flex gap-2.5 flex-wrap animate-[fadeUp_.8s_cubic-bezier(.16,1,.3,1)_forwards] opacity-0" style={{ animationDelay: '.78s' }}>
                {nations.map(n => (
                  <span key={n.code} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium text-white border border-[rgba(255,255,255,.15)] cursor-default hover:scale-105 hover:border-[rgba(255,255,255,.4)] transition-all duration-300 hover:shadow-[0_0_16px_rgba(255,255,255,.1)]" style={{ background: `${n.color}cc` }}>
                    <span className="text-sm">{n.emoji}</span>
                    {n.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Bento cards */}
            <div className="hidden lg:grid grid-cols-2 gap-3 animate-[slideInRight_1s_cubic-bezier(.16,1,.3,1)_forwards] opacity-0" style={{ animationDelay: '.4s' }}>
              {/* Countdown card */}
              <div className="col-span-2 bento-item p-6 text-center" style={{ background: 'rgba(200,155,60,.12)', border: '1px solid rgba(200,155,60,.15)' }}>
                <p className="text-[9px] font-bold tracking-[4px] uppercase text-gold-2 mb-3">Ouverture dans</p>
                <CountdownCompact />
              </div>
              {/* Quick stats */}
              {[
                { val: '5 000+', label: 'Visiteurs', icon: '👥' },
                { val: '250+', label: 'Exposants', icon: '🏢' },
                { val: '4', label: 'Nations', icon: '🌍' },
                { val: '4 jours', label: 'D\'événement', icon: '📅' },
              ].map((q, i) => (
                <div key={q.label} className="bento-item p-5 flex items-center gap-3" style={{ transitionDelay: `${.5 + i * 80}ms` }}>
                  <span className="text-xl">{q.icon}</span>
                  <div>
                    <span className="block font-display text-[20px] font-bold leading-none text-gold-2">{q.val}</span>
                    <small className="block text-[9px] tracking-[1.5px] uppercase mt-1" style={{ color: 'var(--text-muted)' }}>{q.label}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Ticker />
      <Countdown />

      <div className="section-divider">
        <span style={{ background: '#C89B3C' }} />
        <span style={{ background: '#C0392B' }} />
        <span style={{ background: '#1A7A3C' }} />
        <span style={{ background: '#1A5276' }} />
      </div>

      {/* ═══════ ABOUT ═══════ */}
      <section id="about" className="py-[clamp(80px,10vh,140px)] px-[clamp(20px,5vw,80px)]" style={{ background: 'var(--bg-2)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(40px,6vw,100px)] items-start">
            <div>
              <span className="eyebrow">L&apos;événement</span>
              <h2 className="sec-title">Un pont entre <em>deux continents</em></h2>
              <p className="text-[clamp(14px,1.4vw,16px)] leading-[1.9] mb-5 font-light" style={{ color: 'var(--text-main)' }}>
                La Foire Économique et Culturelle Ouest-Africaine 2026 est un événement d&apos;envergure internationale rassemblant pour la première fois à Montréal les communautés commerciales, artisanales et culturelles du Sénégal, de la Guinée, du Mali et de la diaspora africaine au Canada.
              </p>
              <p className="text-[clamp(14px,1.4vw,16px)] leading-[1.9] mb-10 font-light" style={{ color: 'var(--text-main)' }}>
                Pendant quatre jours, Montréal devient le carrefour des échanges entre l&apos;Afrique de l&apos;Ouest et le Canada — un espace de commerce, de dialogue et de célébration culturelle ouvert à tous.
              </p>

              <div className="space-y-0">
                {pillars.map(p => (
                  <div key={p.title} className="flex items-start gap-5 py-5 px-6 rounded-lg border-b transition-all duration-300 hover:bg-[rgba(200,155,60,.04)] border-l-3 border-l-transparent hover:border-l-gold" style={{ borderColor: 'var(--border)' }}>
                    <div className="w-[42px] h-[42px] rounded-full border flex items-center justify-center flex-shrink-0 text-sm transition-all duration-300" style={{ borderColor: p.color, color: p.color }}>
                      {p.icon}
                    </div>
                    <div>
                      <strong className="block text-[12px] font-semibold text-gold-2 mb-1.5">{p.title}</strong>
                      <span className="text-[13px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>{p.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/billetterie" className="btn-gold mt-10 inline-flex !rounded-full">
                Participer à la FÉCOA
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
              </Link>
            </div>

            {/* Stats bento grid */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((s, i) => (
                <StatCard key={s.label} s={s} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider">
        <span style={{ background: '#1A7A3C' }} />
        <span style={{ background: '#C89B3C' }} />
        <span style={{ background: '#1A5276' }} />
        <span style={{ background: '#C0392B' }} />
      </div>

      {/* ═══════ NEWSLETTER ═══════ */}
      <section className="py-[clamp(60px,7vh,100px)] px-[clamp(20px,5vw,80px)] text-center" style={{ background: 'var(--bg-2)' }}>
        <div className="max-w-[600px] mx-auto">
          <div className="glass rounded-2xl p-[clamp(32px,5vw,56px)]">
            <span className="eyebrow justify-center">Restez informé</span>
            <h2 className="font-display text-[clamp(24px,3vw,36px)] font-bold mb-3" style={{ color: 'var(--text-main)' }}>Newsletter FÉCOA</h2>
            <p className="text-[14px] mb-8" style={{ color: 'var(--text-muted)' }}>Recevez les dernières annonces, offres early bird et programme complet.</p>
            <Newsletter />
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="py-[clamp(80px,10vh,140px)] px-[clamp(20px,5vw,80px)] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, var(--gold) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(200,155,60,.06) 0%, transparent 70%)' }} />
        <div className="max-w-[700px] mx-auto relative z-10">
          <span className="eyebrow justify-center">Rejoignez-nous</span>
          <h2 className="sec-title text-center">Prêt à participer à <em>la FÉCOA 2026</em> ?</h2>
          <p className="text-[clamp(14px,1.4vw,16px)] mb-10 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Réservez votre billet dès maintenant ou découvrez les opportunités d&apos;exposition et de sponsoring.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/billetterie" className="btn-gold !rounded-full">Acheter un billet</Link>
            <Link href="/exposants" className="btn-outline !rounded-full">Réserver un stand</Link>
          </div>
        </div>
      </section>
    </>
  )
}

function CountdownCompact() {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 })

  useEffect(() => {
    const target = new Date('2026-12-17T10:00:00')
    function tick() {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) return
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const iv = setInterval(tick, 1000)
    return () => clearInterval(iv)
  }, [])

  const pad = (n: number) => String(n).padStart(2, '0')
  const units = [
    { val: time.d, label: 'J' },
    { val: time.h, label: 'H' },
    { val: time.m, label: 'M' },
    { val: time.s, label: 'S' },
  ]

  return (
    <div className="flex gap-3 justify-center items-center">
      {units.map((u, i) => (
        <div key={u.label} className="flex gap-2 items-center">
          {i > 0 && <span className="font-display text-lg font-light text-gold/20">:</span>}
          <div className="text-center">
            <span className="block font-display text-[28px] font-bold text-gold-2 leading-none">{pad(u.val)}</span>
            <label className="text-[8px] font-bold tracking-[2px] uppercase mt-1 block" style={{ color: 'var(--text-muted)' }}>{u.label}</label>
          </div>
        </div>
      ))}
    </div>
  )
}
