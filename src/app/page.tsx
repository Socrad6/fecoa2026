import Link from 'next/link'
import HeroCanvas from '@/components/home/HeroCanvas'
import Ticker from '@/components/home/Ticker'
import Countdown from '@/components/ui/Countdown'
import Newsletter from '@/components/ui/Newsletter'

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
  { num: 5000, suffix: '+', label: 'Visiteurs', color: '#C89B3C' },
  { num: 250, suffix: '+', label: 'Exposants', color: '#1A5276' },
  { num: 500, suffix: '+', label: 'Rencontres B2B', color: '#1A7A3C' },
  { num: 4, suffix: '', label: 'Nations', color: '#C0392B' },
  { num: 50, suffix: '+', label: 'Conférences', color: '#E67E22' },
  { num: 4, suffix: '', label: 'Jours', color: '#7D3C98' },
]

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section id="home" className="relative min-h-screen overflow-hidden flex items-center px-[clamp(20px,5vw,90px)] pt-24 pb-20">
        {/* Background layers */}
        <HeroCanvas />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(6,21,36,.85)] via-[rgba(6,21,36,.5)] to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,21,36,.6)] via-transparent to-[rgba(6,21,36,.3)] pointer-events-none" />

        {/* Kente left accent */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] flex flex-col">
          {['#C89B3C', '#C0392B', '#1A7A3C', '#1A5276', '#C89B3C', '#C0392B', '#1A7A3C', '#1A5276'].map((c, i) => (
            <span key={i} style={{ background: c }} className="flex-1" />
          ))}
        </div>

        <div className="relative z-10 max-w-[1400px] w-full mx-auto">
          <div className="max-w-[700px]">
            <p className="text-[11px] font-medium tracking-[5px] uppercase text-gold-2 mb-6 flex items-center gap-3">
              <span className="block w-10 h-px bg-gradient-to-r from-gold to-transparent" />
              17 – 20 Décembre 2026 · Montréal, Canada
            </p>

            <h1 className="font-display text-[clamp(48px,8vw,108px)] font-bold leading-[.92] tracking-[-1px] text-white mb-6">
              <span className="block animate-[fadeUp_.85s_cubic-bezier(.16,1,.3,1)_forwards] opacity-0" style={{ animationDelay: '0s' }}>Foire</span>
              <span className="block text-gold-2 animate-[fadeUp_.85s_cubic-bezier(.16,1,.3,1)_forwards] opacity-0" style={{ animationDelay: '.12s' }}>Économique</span>
              <span className="block animate-[fadeUp_.85s_cubic-bezier(.16,1,.3,1)_forwards] opacity-0" style={{ animationDelay: '.24s' }}>Ouest-Africaine</span>
            </h1>

            <p className="text-[clamp(12px,1.3vw,14px)] tracking-[3px] uppercase mb-3 animate-[fadeUp_.8s_cubic-bezier(.16,1,.3,1)_forwards] opacity-0" style={{ animationDelay: '.42s', color: 'var(--text-muted)' }}>
              Sénégal · Guinée · Mali · Diaspora
            </p>

            <p className="text-[clamp(14px,1.4vw,17px)] max-w-[440px] leading-[1.9] mb-10 animate-[fadeUp_.8s_cubic-bezier(.16,1,.3,1)_forwards] opacity-0 font-light" style={{ animationDelay: '.54s', color: 'var(--text-muted)' }}>
              Quatre jours d&apos;échanges commerciaux, de culture et de rencontres entre l&apos;Afrique de l&apos;Ouest et le Canada.
            </p>

            <div className="flex gap-4 flex-wrap mb-12 animate-[fadeUp_.8s_cubic-bezier(.16,1,.3,1)_forwards] opacity-0" style={{ animationDelay: '.66s' }}>
              <Link href="/billetterie" className="btn-gold">
                Acheter un billet
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
              </Link>
              <Link href="/programme" className="btn-outline">Voir le programme</Link>
            </div>

            <div className="flex gap-3 flex-wrap animate-[fadeUp_.8s_cubic-bezier(.16,1,.3,1)_forwards] opacity-0" style={{ animationDelay: '.78s' }}>
              {nations.map(n => (
                <span key={n.code} className="relative w-10 h-10 rounded-full flex items-center justify-center text-[9px] font-bold text-white border-2 border-[rgba(255,255,255,.2)] cursor-default hover:scale-110 hover:border-[rgba(255,255,255,.6)] transition-all duration-300 hover:shadow-[0_0_16px_rgba(255,255,255,.15)]" style={{ background: n.color }}>
                  {n.code}
                  <em className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap not-italic text-[9px] tracking-[1px]" style={{ color: 'var(--text-muted)' }}>{n.name}</em>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Ticker />
      <Countdown />

      {/* KENTE DIVIDER */}
      <div className="section-divider">
        <span style={{ background: '#C89B3C' }} />
        <span style={{ background: '#C0392B' }} />
        <span style={{ background: '#1A7A3C' }} />
        <span style={{ background: '#1A5276' }} />
      </div>

      {/* ABOUT */}
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
                  <div key={p.title} className="flex items-start gap-5 py-5 px-6 border-b transition-all duration-300 hover:bg-[rgba(200,155,60,.04)] hover:border-l-gold border-l-3 border-l-transparent" style={{ borderColor: 'var(--border)' }}>
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

              <Link href="/billetterie" className="btn-gold mt-10 inline-flex">
                Participer à la FÉCOA
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-[2px]">
              {stats.map(s => (
                <div key={s.label} className="p-[clamp(20px,2.5vw,30px)] relative overflow-hidden group cursor-default card" style={{ background: 'var(--bg-3)' }}>
                  <div className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" style={{ background: s.color }} />
                  <span className="block font-display text-[clamp(30px,3.5vw,48px)] font-bold leading-none" style={{ color: s.color }}>
                    {s.num.toLocaleString()}{s.suffix}
                  </span>
                  <small className="block text-[10px] font-medium tracking-[1.5px] uppercase mt-2" style={{ color: 'var(--text-muted)' }}>{s.label}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* KENTE DIVIDER */}
      <div className="section-divider">
        <span style={{ background: '#1A7A3C' }} />
        <span style={{ background: '#C89B3C' }} />
        <span style={{ background: '#1A5276' }} />
        <span style={{ background: '#C0392B' }} />
      </div>

      {/* NEWSLETTER */}
      <section className="py-[clamp(60px,7vh,100px)] px-[clamp(20px,5vw,80px)] text-center" style={{ background: 'var(--bg-2)' }}>
        <div className="max-w-[600px] mx-auto">
          <span className="eyebrow justify-center">Restez informé</span>
          <h2 className="font-display text-[clamp(24px,3vw,36px)] font-bold mb-3" style={{ color: 'var(--text-main)' }}>Newsletter FÉCOA</h2>
          <p className="text-[14px] mb-8" style={{ color: 'var(--text-muted)' }}>Recevez les dernières annonces, offres early bird et programme complet.</p>
          <Newsletter />
        </div>
      </section>

      {/* CTA */}
      <section className="py-[clamp(80px,10vh,140px)] px-[clamp(20px,5vw,80px)] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, var(--gold) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="max-w-[700px] mx-auto relative z-10">
          <span className="eyebrow justify-center">Rejoignez-nous</span>
          <h2 className="sec-title text-center">Prêt à participer à <em>la FÉCOA 2026</em> ?</h2>
          <p className="text-[clamp(14px,1.4vw,16px)] mb-10 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Réservez votre billet dès maintenant ou découvrez les opportunités d&apos;exposition et de sponsoring.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/billetterie" className="btn-gold">Acheter un billet</Link>
            <Link href="/exposants" className="btn-outline">Réserver un stand</Link>
          </div>
        </div>
      </section>
    </>
  )
}
