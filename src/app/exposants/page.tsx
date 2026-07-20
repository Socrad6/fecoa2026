import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Exposants',
  description: 'Réservez votre stand à la FÉCOA 2026. Quatre formules pour tous les profils — de l\'artisan indépendant au pavillon d\'entreprise.',
}

const stands = [
  { tier: 'Essentiel', price: '800', size: '4 m² — 2 × 2', color: '#C89B3C', features: ['Table + 2 chaises', 'Prises électriques', 'Wi-Fi haut débit', 'Catalogue officiel', '2 badges exposant'], popular: false },
  { tier: 'Standard', price: '1 500', size: '9 m² — 3 × 3', color: '#E8B84B', features: ['Tout Essentiel +', 'Cloisons modulaires', "Étagères d'exposition", 'Logo vitrine', '3 badges exposant'], popular: true },
  { tier: 'Premium', price: '2 800', size: '16 m² — 4 × 4', color: '#60a5fa', features: ['Tout Standard +', 'Espace lounge intégré', 'Écran TV 43"', 'Accès B2B Lounge', '5 badges exposant'], popular: false },
  { tier: 'Sur Mesure', price: 'Sur devis', size: '20 m² et plus', color: '#c084fc', features: ['Configuration libre', 'Branding total', 'Services dédiés', 'Visibilité premium', '10 badges exposant'], popular: false },
]

const categories = [
  'Artisanat & Bijoux', 'Textile & Mode', 'Alimentation & Gastronomie',
  'Cosmétique & Beauté', 'Technologie & Services', 'Agro-business', 'Institution / ONG',
]

export default function ExposantsPage() {
  return (
    <>
      <section className="py-[clamp(80px,10vh,140px)] px-[clamp(20px,5vw,80px)] pt-32 page-enter" style={{ background: 'var(--color-bg-2)' }} aria-labelledby="expo-title">
        <div className="max-w-[1400px] mx-auto">
          <span className="eyebrow">Exposants</span>
          <h1 id="expo-title" className="sec-title">Réservez votre <em>stand</em></h1>
          <p className="text-[clamp(14px,1.4vw,16px)] max-w-[520px] leading-[1.8] mb-5" style={{ color: 'var(--color-muted)' }}>
            Quatre formules pour tous les profils — de l&apos;artisan indépendant au pavillon d&apos;entreprise.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {stands.map(s => (
              <div key={s.tier} className={`p-8 relative group rounded-xl transition-all duration-400 ${s.popular ? 'bg-gradient-to-br from-[rgba(14,45,74,.85)] to-[rgba(6,21,36,.85)] border border-[rgba(200,155,60,.2)] shadow-[0_4px_24px_rgba(200,155,60,.08)]' : 'card'}`} style={!s.popular ? {} : {}}>
                {s.popular && <span className="absolute top-4 right-4 text-[8px] font-bold tracking-[1.5px] uppercase px-2.5 py-0.5 text-navy rounded-full" style={{ background: s.color }}>Le plus choisi</span>}
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="w-6 h-px" style={{ background: s.color }} aria-hidden="true" />
                  <span className="text-[9px] font-bold tracking-[3px] uppercase" style={{ color: s.color }}>{s.tier}</span>
                </div>
                <div className="font-display text-[clamp(28px,2.5vw,38px)] font-bold leading-none mb-1" style={{ color: 'var(--color-text)' }}>
                  {s.price === 'Sur devis' ? <>Sur <small className="text-[13px] font-normal" style={{ color: 'var(--color-muted)' }}>devis</small></> : <>{s.price} <small className="text-[13px] font-normal" style={{ color: 'var(--color-muted)' }}>CAD</small></>}
                </div>
                <p className="text-[12px] my-3 pb-4 border-b" style={{ color: 'var(--color-muted)', borderColor: 'var(--color-border)' }}>{s.size}</p>
                <ul className="mb-6">
                  {s.features.map(f => (
                    <li key={f} className="text-[12px] py-1.5 flex gap-2.5 items-center" style={{ color: 'var(--color-text)' }}>
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: s.color }} />{f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="block text-center py-3 border transition-all duration-300 text-[10px] font-semibold tracking-[2px] uppercase hover:text-navy hover:bg-gold hover:shadow-[0_4px_16px_rgba(200,155,60,.2)] rounded-xl" style={{ borderColor: s.color, color: s.color }}>
                  {s.price === 'Sur devis' ? 'Nous contacter' : 'Réserver'}
                </Link>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-5 p-5 border flex-wrap rounded-xl" style={{ borderColor: 'var(--color-border)' }}>
            <div className="flex items-center gap-3 flex-1 min-w-[220px]">
              <span className="text-[8px] font-bold tracking-[1px] uppercase px-3 py-1 bg-gold text-navy rounded-full">Early Bird</span>
              <p className="text-[13px]" style={{ color: 'var(--color-text)' }}><strong className="text-gold-2">−15%</strong> avant le <strong>1er Nov 2026</strong></p>
            </div>
            <div className="w-px h-8" style={{ background: 'var(--color-border)' }} aria-hidden="true" />
            <div className="flex items-center gap-3 flex-1 min-w-[220px]">
              <span className="text-[8px] font-bold tracking-[1px] uppercase px-3 py-1 bg-[#1A7A3C] text-white rounded-full">Diaspora</span>
              <p className="text-[13px]" style={{ color: 'var(--color-text)' }}><strong className="text-gold-2">−10%</strong> au Canada <em className="text-[11px]" style={{ color: 'var(--color-muted)' }}>(cumulables)</em></p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true">
        <span style={{ background: '#C89B3C' }} />
        <span style={{ background: '#C0392B' }} />
        <span style={{ background: '#1A7A3C' }} />
        <span style={{ background: '#1A5276' }} />
      </div>

      <section className="py-[clamp(60px,7vh,100px)] px-[clamp(20px,5vw,80px)]" aria-labelledby="sectors-title">
        <div className="max-w-[1400px] mx-auto">
          <h2 id="sectors-title" className="font-display text-[24px] font-bold mb-3" style={{ color: 'var(--color-text)' }}>Secteurs d&apos;activité représentés</h2>
          <p className="text-[14px] mb-8" style={{ color: 'var(--color-muted)' }}>Les principales industries de l&apos;Afrique de l&apos;Ouest seront présentes.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {categories.map(c => (
              <div key={c} className="px-6 py-4 border text-[13px] rounded-xl hover:border-gold hover:text-gold-2 hover:bg-[rgba(200,155,60,.03)] transition-all duration-300 cursor-default" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
