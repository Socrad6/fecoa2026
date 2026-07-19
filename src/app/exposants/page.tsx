import Link from 'next/link'

const stands = [
  {
    tier: 'Essentiel',
    price: '800',
    size: '4 m² — 2 × 2',
    color: '#C89B3C',
    features: ['Table + 2 chaises', 'Prises électriques', 'Wi-Fi haut débit', 'Catalogue officiel', '2 badges exposant'],
    popular: false,
  },
  {
    tier: 'Standard',
    price: '1 500',
    size: '9 m² — 3 × 3',
    color: '#E8B84B',
    features: ['Tout Essentiel +', 'Cloisons modulaires', 'Étagères d\'exposition', 'Logo vitrine', '3 badges exposant'],
    popular: true,
  },
  {
    tier: 'Premium',
    price: '2 800',
    size: '16 m² — 4 × 4',
    color: '#60a5fa',
    features: ['Tout Standard +', 'Espace lounge intégré', 'Écran TV 43"', 'Accès B2B Lounge', '5 badges exposant'],
    popular: false,
  },
  {
    tier: 'Sur Mesure',
    price: 'Sur devis',
    size: '20 m² et plus',
    color: '#c084fc',
    features: ['Configuration libre', 'Branding total', 'Services dédiés', 'Visibilité premium', '10 badges exposant'],
    popular: false,
  },
]

const categories = [
  'Artisanat & Bijoux', 'Textile & Mode', 'Alimentation & Gastronomie',
  'Cosmétique & Beauté', 'Technologie & Services', 'Agro-business', 'Institution / ONG',
]

export default function ExposantsPage() {
  return (
    <section className="py-[clamp(70px,9vh,128px)] px-[clamp(16px,5vw,80px)] pt-32 bg-navy-2">
      <div className="max-w-[1400px] mx-auto">
        <span className="eyebrow">Exposants</span>
        <h2 className="sec-title">Réservez votre <em>stand</em></h2>
        <p className="text-[clamp(13px,1.4vw,15px)] text-muted max-w-[520px] leading-[1.8] mb-12">
          Quatre formules pour tous les profils — de l&apos;artisan indépendant au pavillon d&apos;entreprise.
        </p>

        {/* Stands grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[2px] bg-[rgba(200,155,60,.12)] border border-[rgba(200,155,60,.12)] mb-6">
          {stands.map(s => (
            <div key={s.tier} className={`bg-navy-2 p-8 relative group ${s.popular ? 'bg-gradient-to-br from-[rgba(14,45,74,.85)] to-[rgba(6,21,36,.85)] border border-[rgba(200,155,60,.2)]' : ''}`}>
              <div className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" style={{ background: s.color }} />
              {s.popular && (
                <span className="absolute top-3 right-3 text-[9px] font-bold tracking-[1.5px] uppercase px-2.5 py-0.5 text-navy" style={{ background: s.color }}>Le plus choisi</span>
              )}
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-4 h-px" style={{ background: s.color }} />
                <span className="text-[9px] font-bold tracking-[3px] uppercase" style={{ color: s.color }}>{s.tier}</span>
              </div>
              <div className="font-display text-[clamp(28px,3vw,42px)] font-bold text-white leading-none mb-1">
                {s.price === 'Sur devis' ? <>Sur <small className="text-[13px] text-muted font-normal">devis</small></> : <>{s.price} <small className="text-[13px] text-muted font-normal">CAD</small></>}
              </div>
              <p className="text-[12px] text-muted my-2.5 pb-4 border-b border-[rgba(200,155,60,.12)]">{s.size}</p>
              <ul className="mb-6">
                {s.features.map(f => (
                  <li key={f} className="text-[12px] text-text py-1.5 flex gap-2.5 items-center">
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: s.color }} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="block text-center py-2.5 border transition-all text-[10px] font-semibold tracking-[2px] uppercase hover:text-navy hover:bg-gold" style={{ borderColor: s.color, color: s.color }}>
                {s.price === 'Sur devis' ? 'Nous contacter' : 'Réserver'}
              </Link>
            </div>
          ))}
        </div>

        {/* Promos */}
        <div className="flex items-center gap-4 p-4 border border-[rgba(200,155,60,.12)] bg-[rgba(200,155,60,.04)] flex-wrap">
          <div className="flex items-center gap-2.5 flex-1 min-w-[200px]">
            <span className="text-[9px] font-bold tracking-[1px] uppercase px-2.5 py-1 bg-gold text-navy">Early Bird</span>
            <p className="text-[13px] text-text"><strong className="text-gold-2">−15 %</strong> sur tous les stands avant le <strong>1er Novembre 2026</strong></p>
          </div>
          <div className="w-px h-7 bg-[rgba(200,155,60,.12)]" />
          <div className="flex items-center gap-2.5 flex-1 min-w-[200px]">
            <span className="text-[9px] font-bold tracking-[1px] uppercase px-2.5 py-1 bg-senegal text-white">Diaspora</span>
            <p className="text-[13px] text-text"><strong className="text-gold-2">−10 %</strong> pour les exposants au Canada <em className="text-muted text-[11px]">(cumulables)</em></p>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-16">
          <h3 className="font-display text-2xl font-bold text-white mb-6">Secteurs d&apos;activité représentés</h3>
          <div className="flex gap-2 flex-wrap">
            {categories.map(c => (
              <span key={c} className="px-4 py-2 border border-[rgba(200,155,60,.12)] text-[12px] text-muted hover:border-gold hover:text-gold-2 transition-all cursor-default">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
