import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sponsors',
  description: 'Devenez partenaire officiel de la FÉCOA 2026. 500 000 consommateurs africains au Canada, visibilité internationale.',
}

const packages = [
  { name: 'Bronze', price: '5 000', color: '#a8a8a8', features: [{ text: '4 invitations', included: true }, { text: 'Logo sur site web', included: true }, { text: 'Mention programme', included: true }, { text: 'Stand d\'exposition', included: false }, { text: 'Allocution officielle', included: false }] },
  { name: 'Argent', price: '10 000', color: '#c0c0c0', features: [{ text: '6 invitations', included: true }, { text: 'Logo tous supports', included: true }, { text: 'Stand 6 m²', included: true }, { text: 'Mention médias', included: true }, { text: 'Allocution officielle', included: false }] },
  { name: 'Or', price: '25 000', color: '#C89B3C', features: [{ text: '10 invitations VIP', included: true }, { text: 'Logo XL tous supports', included: true }, { text: 'Stand 12 m²', included: true }, { text: 'Article médias dédié', included: true }, { text: 'Rapport ROI complet', included: true }], featured: true },
  { name: 'Platine', price: '50 000+', color: '#E8B84B', features: [{ text: '20 invitations VIP', included: true }, { text: 'Stand 20 m² sur mesure', included: true }, { text: 'Allocution ouverture', included: true }, { text: 'Exclusivité sectorielle', included: true }, { text: 'ROI + PR dédié', included: true }] },
]

const availableSlots = { platine: 2, or: 4 }

export default function SponsorsPage() {
  return (
    <>
      <section className="py-[clamp(80px,10vh,140px)] px-[clamp(20px,5vw,80px)] pt-32 page-enter" aria-labelledby="spons-title">
        <div className="max-w-[1400px] mx-auto">
          <span className="eyebrow">Sponsors</span>
          <h1 id="spons-title" className="sec-title">Devenez partenaire <em>officiel</em></h1>
          <p className="text-[clamp(14px,1.4vw,16px)] max-w-[520px] leading-[1.8] mb-5" style={{ color: 'var(--color-muted)' }}>
            500 000 consommateurs africains au Canada, visibilité internationale et engagement RSE mesurable.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {packages.map(pkg => (
              <div key={pkg.name} className={`p-8 relative group rounded-xl transition-all duration-400 ${pkg.featured ? 'bg-gradient-to-br from-[rgba(14,45,74,.9)] to-[rgba(6,21,36,.9)] border border-[rgba(200,155,60,.2)] shadow-[0_4px_24px_rgba(200,155,60,.08)]' : 'card'}`} style={!pkg.featured ? {} : {}}>
                {pkg.featured && <span className="absolute top-4 right-4 text-[8px] font-bold tracking-[1.5px] uppercase px-2.5 py-0.5 text-navy rounded-full" style={{ background: pkg.color }}>Recommandé</span>}
                <div className="font-display text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>{pkg.name}</div>
                <div className="font-display text-[clamp(26px,2.5vw,34px)] font-bold leading-none mb-6" style={{ color: pkg.color }}>
                  {pkg.price} <small className="text-[13px] font-normal" style={{ color: 'var(--color-muted)' }}>CAD</small>
                </div>
                <div className="mb-6">
                  {pkg.features.map(f => (
                    <div key={f.text} className={`text-[12px] py-2 border-b flex gap-2 items-center ${f.included ? '' : 'opacity-25'}`} style={{ borderColor: 'var(--color-border)', color: f.included ? 'var(--color-text)' : 'var(--color-muted)' }}>
                      <span className={f.included ? 'text-gold-2 font-bold' : ''}>{f.included ? '✓' : '—'}</span>
                      {f.text}
                    </div>
                  ))}
                </div>
                <Link href="/contact" className="block text-center py-3 border transition-all duration-300 text-[10px] font-semibold tracking-[2px] uppercase hover:text-navy hover:bg-gold hover:shadow-[0_4px_16px_rgba(200,155,60,.2)] rounded-xl" style={{ borderColor: pkg.color, color: pkg.color }}>
                  Souscrire
                </Link>
              </div>
            ))}
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-[10px] font-semibold tracking-[3px] uppercase mb-4" style={{ color: 'var(--color-muted)' }}>Sponsors Platine — {availableSlots.platine} places disponibles</p>
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: availableSlots.platine }).map((_, i) => (
                  <div key={i} className="min-w-0 h-[80px] border border-dashed rounded-xl flex items-center justify-center text-[11px] font-medium tracking-[1.5px] cursor-pointer hover:bg-[rgba(200,155,60,.04)] hover:text-gold-2 hover:border-gold transition-all duration-300" style={{ background: 'var(--color-bg-2)', borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}>
                    + Votre logo ici
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-[3px] uppercase mb-4" style={{ color: 'var(--color-muted)' }}>Sponsors Or — {availableSlots.or} places disponibles</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Array.from({ length: availableSlots.or }).map((_, i) => (
                  <div key={i} className="min-w-0 h-[80px] border border-dashed rounded-xl flex items-center justify-center text-[11px] font-medium tracking-[1.5px] cursor-pointer hover:bg-[rgba(200,155,60,.04)] hover:text-gold-2 hover:border-gold transition-all duration-300" style={{ background: 'var(--color-bg-2)', borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}>
                    + Votre logo
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
