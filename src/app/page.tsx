'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import HeroCanvas from '@/components/home/HeroCanvas'
import Ticker from '@/components/home/Ticker'
import Countdown from '@/components/ui/Countdown'
import Newsletter from '@/components/ui/Newsletter'
import { useScrollReveal, useStaggerReveal } from '@/lib/hooks'
import { useI18n } from '@/components/ui/I18nProvider'

interface StatType {
  num: number
  suffix: string
  label: string
  color: string
}

function useCountUp(target: number, duration = 2000, active = false) {
  const [val, setVal] = useState(0)
  const [popped, setPopped] = useState(false)
  useEffect(() => {
    if (!active) return
    let start = 0
    let raf: number
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setVal(Math.floor(eased * target))
      if (progress < 1) raf = requestAnimationFrame(step)
      else setPopped(true)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [active, target, duration])
  return { val, popped }
}

function StatCard({ s, index }: { s: StatType; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const { val: count, popped } = useCountUp(s.num, 2000 + index * 300, visible)

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
      className="bento-item p-6 sm:p-8 flex flex-col justify-center text-center min-h-[140px] opacity-0 translate-y-6 transition-all"
      style={{
        transitionDelay: `${index * 80}ms`,
        transitionDuration: '.7s',
        transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)',
        ...(visible ? { opacity: 1, transform: 'translateY(0)' } : {}),
      }}
    >
      <span
        className={`block font-display text-[clamp(36px,4vw,56px)] font-bold leading-none ${popped ? 'animate-count-pop' : ''}`}
        style={{ color: s.color }}
      >
        {count.toLocaleString()}{s.suffix}
      </span>
      <small className="block text-[10px] font-semibold tracking-[2px] uppercase mt-3" style={{ color: 'var(--color-muted)' }}>{s.label}</small>
    </div>
  )
}

function CountdownCompact() {
  const { locale } = useI18n()
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
    { val: time.d, label: locale === 'fr' ? 'J' : 'D' },
    { val: time.h, label: 'H' },
    { val: time.m, label: 'M' },
    { val: time.s, label: 'S' },
  ]

  return (
    <div className="flex gap-3 justify-center items-center" role="timer" aria-label="Compte à rebours">
      {units.map((u, i) => (
        <div key={u.label} className="flex gap-2 items-center">
          {i > 0 && <span className="font-display text-lg font-light text-gold/20" aria-hidden="true">:</span>}
          <div className="text-center min-w-[52px] py-2 rounded-xl" style={{ background: 'rgba(200,155,60,.08)', border: '1px solid rgba(200,155,60,.06)' }}>
            <span className="block font-display text-[26px] font-bold text-gold-2 leading-none">{pad(u.val)}</span>
            <label className="text-[7px] font-bold tracking-[2px] uppercase mt-1 block" style={{ color: 'var(--color-muted)' }}>{u.label}</label>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function HomePage() {
  const { t, locale } = useI18n()

  const nations = [
    { code: 'SN', name: locale === 'fr' ? 'Sénégal' : 'Senegal', color: '#1A7A3C', emoji: '🇸🇳' },
    { code: 'GN', name: locale === 'fr' ? 'Guinée' : 'Guinea', color: '#C0392B', emoji: '🇬🇳' },
    { code: 'ML', name: 'Mali', color: '#C89B3C', emoji: '🇲🇱' },
    { code: 'CA', name: 'Diaspora', color: '#D52B1E', emoji: '🍁' },
  ]

  const pillars = [
    { icon: '◆', title: locale === 'fr' ? 'Commerce & Investissement' : 'Trade & Investment', desc: locale === 'fr' ? 'Forum B2B, matchmaking, opportunités Canada-Afrique' : 'B2B forum, matchmaking, Canada-Africa opportunities', color: '#1A5276' },
    { icon: '◇', title: locale === 'fr' ? 'Culture & Patrimoine' : 'Culture & Heritage', desc: locale === 'fr' ? 'Artisanat, musique, gastronomie, mode africaine' : 'Handicraft, music, gastronomy, African fashion', color: '#C89B3C' },
    { icon: '●', title: locale === 'fr' ? 'Diaspora & Communauté' : 'Diaspora & Community', desc: locale === 'fr' ? 'Solidarité, rencontres, 500 000 Africains au Canada' : 'Solidarity, networking, 500,000 Africans in Canada', color: '#1A7A3C' },
    { icon: '▲', title: locale === 'fr' ? 'Innovation & Jeunesse' : 'Innovation & Youth', desc: locale === 'fr' ? 'Startups, pitches, incubateurs, entrepreneurs <35 ans' : 'Startups, pitches, incubators, entrepreneurs <35 years old', color: '#C0392B' },
  ]

  const stats = [
    { num: 5000, suffix: '+', label: locale === 'fr' ? 'Visiteurs' : 'Visitors', color: '#C89B3C' },
    { num: 250, suffix: '+', label: locale === 'fr' ? 'Exposants' : 'Exhibitors', color: '#1A5276' },
    { num: 500, suffix: '+', label: locale === 'fr' ? 'Rencontres B2B' : 'B2B Meetings', color: '#1A7A3C' },
    { num: 4, suffix: '', label: 'Nations', color: '#C0392B' },
    { num: 50, suffix: '+', label: 'Conférences', color: '#E67E22' },
    { num: 4, suffix: '', label: locale === 'fr' ? 'Jours' : 'Days', color: '#7D3C98' },
  ]

  const aboutRef = useScrollReveal()
  const aboutTextRef = useScrollReveal()
  const pillarsRef = useStaggerReveal()
  const statsRef = useStaggerReveal()
  const newsletterRef = useScrollReveal()
  const ctaRef = useScrollReveal()
  const heroParallax = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = heroParallax.current
    if (!el) return
    let raf: number
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        if (y < window.innerHeight) {
          el.style.transform = `translateY(${y * 0.15}px)`
          el.style.opacity = `${1 - y / (window.innerHeight * 0.8)}`
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      {/* ═══════ HERO ═══════ */}
      <section id="home" className="relative min-h-[100svh] overflow-hidden flex items-center px-[clamp(20px,5vw,80px)] pt-28 pb-20" aria-label={locale === 'fr' ? 'Accueil' : 'Home'}>
        <HeroCanvas />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(6,21,36,.92)] via-[rgba(6,21,36,.55)] to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,21,36,.65)] via-transparent to-[rgba(6,21,36,.25)] pointer-events-none" />

        <div className="absolute left-0 top-0 bottom-0 w-[3px] flex flex-col" aria-hidden="true">
          {['#C89B3C', '#C0392B', '#1A7A3C', '#1A5276', '#C89B3C', '#C0392B', '#1A7A3C', '#1A5276'].map((c, i) => (
            <span key={i} style={{ background: c }} className="flex-1" />
          ))}
        </div>

        <div className="relative z-10 max-w-[1400px] w-full mx-auto" ref={heroParallax}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-center">
            {/* Left text */}
            <div>
              <p className="eyebrow animate-fadeUp" style={{ animationDelay: '0s' }}>
                {t('hero.date')}
              </p>

              <h1 className="font-display text-[clamp(44px,7vw,96px)] font-bold leading-[.92] tracking-[-.02em] text-white mb-6">
                <span className="block animate-fadeUp" style={{ animationDelay: '.08s', opacity: 0 }}>{t('hero.title.1')}</span>
                <span className="block text-gold-2 animate-fadeUp" style={{ animationDelay: '.18s', opacity: 0 }}>{t('hero.title.2')}</span>
                <span className="block animate-fadeUp" style={{ animationDelay: '.28s', opacity: 0 }}>{t('hero.title.3')}</span>
              </h1>

              <p className="text-[clamp(11px,1.2vw,13px)] tracking-[3px] uppercase mb-3 animate-fadeUp" style={{ animationDelay: '.42s', opacity: 0, color: 'var(--color-muted)' }}>
                {t('hero.subtitle')}
              </p>

              <p className="text-[clamp(14px,1.4vw,17px)] max-w-[440px] leading-[1.9] mb-10 animate-fadeUp font-light" style={{ animationDelay: '.54s', opacity: 0, color: 'var(--color-muted)' }}>
                {t('hero.desc')}
              </p>

              <div className="flex gap-3 flex-wrap mb-12 animate-fadeUp" style={{ animationDelay: '.66s', opacity: 0 }}>
                <Link href="/billetterie" className="btn-gold">
                  {t('hero.cta.tickets')}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 7h10M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
                </Link>
                <Link href="/programme" className="btn-outline">{t('hero.cta.programme')}</Link>
              </div>

              <div className="flex gap-2.5 flex-wrap animate-fadeUp" style={{ animationDelay: '.78s', opacity: 0 }}>
                {nations.map(n => (
                  <span key={n.code} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium text-white border border-[rgba(255,255,255,.15)] cursor-default hover:scale-110 hover:border-[rgba(255,255,255,.5)] transition-all duration-500 hover:shadow-[0_0_24px_rgba(255,255,255,.12)]" style={{ background: `${n.color}cc` }}>
                    <span className="text-sm">{n.emoji}</span>
                    {n.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Right bento */}
            <div className="hidden lg:grid grid-cols-2 gap-3 animate-slideInRight" style={{ animationDelay: '.4s', opacity: 0 }}>
              <div className="col-span-2 bento-item p-6 text-center" style={{ background: 'rgba(200,155,60,.08)', border: '1px solid rgba(200,155,60,.1)' }}>
                <p className="text-[9px] font-bold tracking-[4px] uppercase text-gold-2 mb-3">
                  {locale === 'fr' ? 'Ouverture dans' : 'Opening in'}
                </p>
                <CountdownCompact />
              </div>
              {[
                { val: '5 000+', label: locale === 'fr' ? 'Visiteurs' : 'Visitors', icon: '👥' },
                { val: '250+', label: locale === 'fr' ? 'Exposants' : 'Exhibitors', icon: '🏢' },
                { val: '4', label: 'Nations', icon: '🌍' },
                { val: locale === 'fr' ? '4 jours' : '4 days', label: locale === 'fr' ? "D'événement" : 'Of Event', icon: '📅' },
              ].map((q, i) => (
                <div key={q.label} className="bento-item p-5 flex items-center gap-3" style={{ transitionDelay: `${.5 + i * 80}ms` }}>
                  <span className="text-xl">{q.icon}</span>
                  <div>
                    <span className="block font-display text-[20px] font-bold leading-none text-gold-2">{q.val}</span>
                    <small className="block text-[9px] tracking-[1.5px] uppercase mt-1" style={{ color: 'var(--color-muted)' }}>{q.label}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Ticker />
      <Countdown />

      <div className="section-divider" aria-hidden="true">
        <span style={{ background: '#C89B3C' }} />
        <span style={{ background: '#C0392B' }} />
        <span style={{ background: '#1A7A3C' }} />
        <span style={{ background: '#1A5276' }} />
      </div>

      {/* ═══════ ABOUT ═══════ */}
      <section id="about" className="py-[clamp(80px,10vh,140px)] px-[clamp(20px,5vw,80px)]" style={{ background: 'var(--color-bg-2)' }} aria-labelledby="about-title">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(40px,6vw,100px)] items-start">
            <div ref={aboutTextRef} className="reveal">
              <span className="eyebrow">{locale === 'fr' ? "L'événement" : "The Event"}</span>
              <h2 id="about-title" className="sec-title">
                {locale === 'fr' ? <>Un pont entre <em>deux continents</em></> : <>A bridge between <em>two continents</em></>}
              </h2>
              <p className="text-[clamp(14px,1.4vw,16px)] leading-[1.9] mb-5 font-light" style={{ color: 'var(--color-text)' }}>
                {locale === 'fr'
                  ? "La Foire Économique et Culturelle Ouest-Africaine 2026 est un événement d'envergure internationale rassemblant pour la première fois à Montréal les communautés commerciales, artisanales et culturelles du Sénégal, de la Guinée, du Mali et de la diaspora africaine au Canada."
                  : "The West African Economic and Cultural Fair 2026 is an international event bringing together for the first time in Montreal the business, artisan and cultural communities of Senegal, Guinea, Mali and the African diaspora in Canada."}
              </p>
              <p className="text-[clamp(14px,1.4vw,16px)] leading-[1.9] mb-10 font-light" style={{ color: 'var(--color-text)' }}>
                {locale === 'fr'
                  ? "Pendant quatre jours, Montréal devient le carrefour des échanges entre l'Afrique de l'Ouest et le Canada — un espace de commerce, de dialogue et de célébration culturelle ouvert à tous."
                  : "For four days, Montreal becomes the crossroads of exchanges between West Africa and Canada — a space of trade, dialogue and cultural celebration open to all."}
              </p>

              <div className="space-y-0" role="list" aria-label="Les quatre piliers" ref={pillarsRef}>
                {pillars.map(p => (
                  <div key={p.title} role="listitem" className="reveal flex items-start gap-5 py-5 px-6 rounded-lg border-b transition-all duration-500 hover:bg-[rgba(200,155,60,.04)] border-l-3 border-l-transparent hover:border-l-gold" style={{ borderColor: 'var(--color-border)' }}>
                    <div className="w-[42px] h-[42px] rounded-full border flex items-center justify-center flex-shrink-0 text-sm transition-all duration-500 group-hover:scale-110" style={{ borderColor: p.color, color: p.color }}>
                      {p.icon}
                    </div>
                    <div>
                      <strong className="block text-[12px] font-semibold text-gold-2 mb-1.5">{p.title}</strong>
                      <span className="text-[13px] leading-relaxed" style={{ color: 'var(--color-muted)' }}>{p.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 reveal">
                <Link href="/billetterie" className="btn-gold inline-flex">
                  {locale === 'fr' ? 'Participer à la FÉCOA' : 'Participate in FÉCOA'}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 7h10M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-2 gap-3" aria-label="Statistiques">
              {stats.map((s, i) => (
                <StatCard key={s.label} s={s} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true">
        <span style={{ background: '#1A7A3C' }} />
        <span style={{ background: '#C89B3C' }} />
        <span style={{ background: '#1A5276' }} />
        <span style={{ background: '#C0392B' }} />
      </div>

      {/* ═══════ NEWSLETTER ═══════ */}
      <section className="py-[clamp(60px,7vh,100px)] px-[clamp(20px,5vw,80px)] text-center" style={{ background: 'var(--color-bg-2)' }} aria-label="Newsletter">
        <div className="max-w-[600px] mx-auto" ref={newsletterRef}>
          <div className="glass p-[clamp(32px,5vw,56px)] reveal-scale">
            <span className="eyebrow justify-center">{locale === 'fr' ? 'Restez informé' : 'Stay informed'}</span>
            <h2 className="font-display text-[clamp(24px,3vw,36px)] font-bold mb-3" style={{ color: 'var(--color-text)' }}>
              {t('footer.newsletter.title')} FÉCOA
            </h2>
            <p className="text-[14px] mb-8" style={{ color: 'var(--color-muted)' }}>
              {locale === 'fr' ? 'Recevez les dernières annonces, offres early bird et programme complet.' : 'Receive the latest announcements, early bird offers and full program.'}
            </p>
            <Newsletter />
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="py-[clamp(80px,10vh,140px)] px-[clamp(20px,5vw,80px)] text-center relative overflow-hidden" aria-label="Participez">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, var(--gold) 1px, transparent 0)', backgroundSize: '40px 40px' }} aria-hidden="true" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none animate-glow-pulse" style={{ background: 'radial-gradient(circle, rgba(200,155,60,.08) 0%, transparent 70%)' }} aria-hidden="true" />
        <div className="max-w-[700px] mx-auto relative z-10" ref={ctaRef}>
          <div className="reveal">
            <span className="eyebrow justify-center">{locale === 'fr' ? 'Rejoignez-nous' : 'Join us'}</span>
            <h2 className="sec-title text-center">
              {locale === 'fr' ? <>Prêt à participer à <em>la FÉCOA 2026</em> ?</> : <>Ready to join <em>FÉCOA 2026</em> ?</>}
            </h2>
            <p className="text-[clamp(14px,1.4vw,16px)] mb-10 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              {locale === 'fr' ? 'Réservez votre billet dès maintenant ou découvrez les opportunités d\'exposition et de sponsoring.' : 'Book your ticket now or discover exhibition and sponsorship opportunities.'}
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/billetterie" className="btn-gold">{t('hero.cta.tickets')}</Link>
              <Link href="/exposants" className="btn-outline">
                {locale === 'fr' ? 'Réserver un stand' : 'Book a stand'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
