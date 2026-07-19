import Link from 'next/link'
import Image from 'next/image'
import HeroCanvas from '@/components/home/HeroCanvas'
import Ticker from '@/components/home/Ticker'
import Countdown from '@/components/ui/Countdown'

const nations = [
  { code: 'SN', name: 'Sénégal', color: '#1A7A3C' },
  { code: 'GN', name: 'Guinée', color: '#C0392B' },
  { code: 'ML', name: 'Mali', color: '#C89B3C' },
  { code: 'CA', name: 'Diaspora', color: '#D52B1E' },
]

const pillars = [
  { icon: '◆', title: 'Commerce & Investissement', desc: 'Forum B2B, matchmaking, opportunités Canada-Afrique', color: '#1A5276' },
  { icon: '◇', title: 'Culture & Patrimoine', desc: 'Artisanat, musique, gastronomie, mode africaine', color: '#C89B3C' },
  { icon: '●', title: 'Diaspora & Communauté', desc: 'Solidarité, rencontres, 500 000 Africains au Canada', color: '#1A7A3C' },
  { icon: '▲', title: 'Innovation & Jeunesse', desc: 'Startups, pitches, incubateurs, entrepreneurs <35 ans', color: '#C0392B' },
]

const stats = [
  { num: 5000, suffix: '+', label: 'Visiteurs attendus', color: '#C89B3C', span: 'col-span-2' },
  { num: 250, suffix: '+', label: 'Exposants', color: '#1A5276', span: '' },
  { num: 500, suffix: '+', label: 'Rencontres B2B', color: '#1A7A3C', span: '' },
  { num: 4, suffix: '', label: 'Nations', color: '#C0392B', span: '' },
  { num: 4, suffix: '', label: 'Jours — 17–20 Déc 2026', color: '#7D3C98', span: 'col-span-2' },
  { num: 50, suffix: '+', label: 'Conférences', color: '#E67E22', span: '' },
]

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section id="home" className="relative min-h-screen overflow-hidden flex items-center px-[clamp(16px,5vw,90px)] pt-24 pb-20">
        <HeroCanvas />

        {/* Kente stripe left */}
        <div className="absolute left-0 top-0 bottom-0 w-1 flex flex-col">
          {['#C89B3C', '#C0392B', '#1A7A3C', '#1A5276', '#C89B3C', '#C0392B', '#1A7A3C', '#1A5276'].map((c, i) => (
            <span key={i} style={{ background: c }} className="flex-1" />
          ))}
        </div>

        <div className="relative z-10 max-w-[1400px] w-full mx-auto">
          <p className="text-[11px] font-medium tracking-[5px] uppercase text-gold-2 mb-5 flex items-center gap-3">
            <span className="block w-9 h-px bg-gold" />
            17 – 20 Décembre 2026 · Montréal, Canada
          </p>

          <h1 className="font-display text-[clamp(48px,8vw,114px)] font-bold leading-[.92] tracking-[-1px] text-white mb-5 max-w-[54vw]">
            <span className="block animate-[fadeUp_.85s_cubic-bezier(.16,1,.3,1)_forwards] opacity-0" style={{ animationDelay: '0s' }}>Foire</span>
            <span className="block text-gold-2 animate-[fadeUp_.85s_cubic-bezier(.16,1,.3,1)_forwards] opacity-0" style={{ animationDelay: '.12s' }}>Économique</span>
            <span className="block animate-[fadeUp_.85s_cubic-bezier(.16,1,.3,1)_forwards] opacity-0" style={{ animationDelay: '.24s' }}>Ouest-Africaine</span>
          </h1>

          <p className="text-[clamp(12px,1.3vw,15px)] text-muted tracking-[2px] mb-3 animate-[fadeUp_.8s_cubic-bezier(.16,1,.3,1)_forwards] opacity-0" style={{ animationDelay: '.42s' }}>
            Sénégal · Guinée · Mali · Diaspora
          </p>

          <p className="text-[clamp(13px,1.3vw,16px)] text-muted max-w-[390px] leading-[1.8] mb-10 animate-[fadeUp_.8s_cubic-bezier(.16,1,.3,1)_forwards] opacity-0" style={{ animationDelay: '.54s' }}>
            Quatre jours d&apos;échanges commerciaux, de culture et de rencontres entre l&apos;Afrique de l&apos;Ouest et le Canada.
          </p>

          <div className="flex gap-3.5 flex-wrap mb-10 animate-[fadeUp_.8s_cubic-bezier(.16,1,.3,1)_forwards] opacity-0" style={{ animationDelay: '.66s' }}>
            <Link href="/billetterie" className="btn-gold">
              Acheter un billet
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
            </Link>
            <Link href="/programme" className="btn-outline">Voir le programme</Link>
          </div>

          <div className="flex gap-2.5 flex-wrap animate-[fadeUp_.8s_cubic-bezier(.16,1,.3,1)_forwards] opacity-0" style={{ animationDelay: '.78s' }}>
            {nations.map(n => (
              <span key={n.code} className="relative w-9 h-9 rounded-full flex items-center justify-center text-[9px] font-bold text-white border-2 border-[rgba(255,255,255,.22)] cursor-default hover:scale-110 hover:border-[rgba(255,255,255,.65)] transition-all" style={{ background: n.color }}>
                {n.code}
                <em className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap not-italic text-[9px] text-muted tracking-[1px]">{n.name}</em>
              </span>
            ))}
          </div>
        </div>

      </section>

      {/* TICKER */}
      <Ticker />

      {/* COUNTDOWN */}
      <Countdown />

      {/* ABOUT */}
      <section id="about" className="bg-navy-2 py-[clamp(70px,9vh,128px)] px-[clamp(16px,5vw,80px)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(36px,6vw,96px)] items-center">
            <div>
              <span className="eyebrow">L&apos;événement</span>
              <h2 className="sec-title">Un pont entre <em>deux continents</em></h2>
              <p className="text-[clamp(13px,1.4vw,15px)] text-text leading-[1.9] mb-4 font-light">
                La Foire Économique et Culturelle Ouest-Africaine 2026 est un événement d&apos;envergure internationale rassemblant pour la première fois à Montréal les communautés commerciales, artisanales et culturelles du Sénégal, de la Guinée, du Mali et de la diaspora africaine au Canada.
              </p>
              <p className="text-[clamp(13px,1.4vw,15px)] text-text leading-[1.9] mb-8 font-light">
                Pendant quatre jours, Montréal devient le carrefour des échanges entre l&apos;Afrique de l&apos;Ouest et le Canada — un espace de commerce, de dialogue et de célébration culturelle ouvert à tous.
              </p>

              <div className="flex flex-col border-l border-[rgba(200,155,60,.12)]">
                {pillars.map(p => (
                  <div key={p.title} className="flex items-start gap-3.5 py-4 px-5 border-b border-[rgba(200,155,60,.06)] hover:bg-[rgba(200,155,60,.04)] transition-all border-l-3 border-l-transparent hover:border-l-gold">
                    <div className="w-[34px] h-[34px] rounded-full border flex items-center justify-center flex-shrink-0 text-sm" style={{ borderColor: p.color, color: p.color }}>
                      {p.icon}
                    </div>
                    <div>
                      <strong className="block text-xs font-semibold text-gold-2 mb-0.5">{p.title}</strong>
                      <span className="text-xs text-muted">{p.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/billetterie" className="btn-gold mt-8 inline-flex">
                Participer à la FÉCOA
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-[2px]">
              {stats.map(s => (
                <div key={s.label} className={`bg-navy-3 p-[clamp(18px,2.5vw,30px)] relative overflow-hidden group cursor-default ${s.span === 'col-span-2' ? 'col-span-2' : ''}`}>
                  <div className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" style={{ background: s.color }} />
                  <span className="block font-display text-[clamp(34px,4vw,50px)] font-bold leading-none" style={{ color: s.color }}>
                    {s.num.toLocaleString()}{s.suffix}
                  </span>
                  <small className="block text-[11px] font-medium tracking-[1px] text-muted uppercase mt-1.5">{s.label}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[clamp(60px,8vh,120px)] px-[clamp(16px,5vw,80px)] text-center">
        <div className="max-w-[700px] mx-auto">
          <span className="eyebrow justify-center">Rejoignez-nous</span>
          <h2 className="sec-title text-center">Prêt à participer à <em>la FÉCOA 2026</em> ?</h2>
          <p className="text-[clamp(13px,1.4vw,15px)] text-muted mb-8 leading-relaxed">
            Réservez votre billet dès maintenant ou découvrez les opportunites d&apos;exposition et de sponsoring.
          </p>
          <div className="flex gap-3.5 justify-center flex-wrap">
            <Link href="/billetterie" className="btn-gold">Acheter un billet</Link>
            <Link href="/exposants" className="btn-outline">Réserver un stand</Link>
          </div>
        </div>
      </section>
    </>
  )
}
