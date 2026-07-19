import Link from 'next/link'

const packages = [
  {
    name: 'Bronze',
    price: '5 000',
    color: '#a8a8a8',
    features: [
      { text: '4 invitations', included: true },
      { text: 'Logo sur site web', included: true },
      { text: 'Mention programme', included: true },
      { text: 'Stand d\'exposition', included: false },
      { text: 'Allocution officielle', included: false },
    ],
  },
  {
    name: 'Argent',
    price: '10 000',
    color: '#c0c0c0',
    features: [
      { text: '6 invitations', included: true },
      { text: 'Logo tous supports', included: true },
      { text: 'Stand 6 m²', included: true },
      { text: 'Mention médias', included: true },
      { text: 'Allocution officielle', included: false },
    ],
  },
  {
    name: 'Or',
    price: '25 000',
    color: '#C89B3C',
    features: [
      { text: '10 invitations VIP', included: true },
      { text: 'Logo XL tous supports', included: true },
      { text: 'Stand 12 m²', included: true },
      { text: 'Article médias dédié', included: true },
      { text: 'Rapport ROI complet', included: true },
    ],
    featured: true,
  },
  {
    name: 'Platine',
    price: '50 000+',
    color: '#E8B84B',
    features: [
      { text: '20 invitations VIP', included: true },
      { text: 'Stand 20 m² sur mesure', included: true },
      { text: 'Allocution ouverture', included: true },
      { text: 'Exclusivité sectorielle', included: true },
      { text: 'ROI + PR dédié', included: true },
    ],
  },
]

const availableSlots = { platine: 2, or: 4 }

export default function SponsorsPage() {
  return (
    <>
      <section className="py-[clamp(70px,9vh,128px)] px-[clamp(16px,5vw,80px)] pt-32">
        <div className="max-w-[1400px] mx-auto">
          <span className="eyebrow">Sponsors</span>
          <h2 className="sec-title">Devenez partenaire <em>officiel</em></h2>
          <p className="text-[clamp(13px,1.4vw,15px)] max-w-[520px] leading-[1.8] mb-4" style={{ color: 'var(--text-muted)' }}>
            500 000 consommateurs africains au Canada, visibilité internationale et engagement RSE mesurable.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[2px] border mb-6" style={{ borderColor: 'var(--border)' }}>
            {packages.map(pkg => (
              <div key={pkg.name} className={`p-7 relative group ${pkg.featured ? 'bg-gradient-to-br from-[rgba(14,45,74,.9)] to-[rgba(6,21,36,.9)] border border-[rgba(200,155,60,.2)]' : ''}`} style={!pkg.featured ? { background: 'var(--bg-2)' } : {}}>
                <div className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" style={{ background: pkg.color }} />
                {pkg.featured && (
                  <span className="absolute top-3 right-3 text-[8px] font-bold tracking-[1.5px] uppercase px-2 py-0.5 text-navy" style={{ background: pkg.color }}>Recommandé</span>
                )}
                <div className="font-display text-xl font-bold mb-1" style={{ color: 'var(--text-main)' }}>{pkg.name}</div>
                <div className="font-display text-[clamp(24px,2.5vw,32px)] font-bold leading-none mb-5" style={{ color: pkg.color }}>
                  {pkg.price} <small className="text-[12px] font-normal" style={{ color: 'var(--text-muted)' }}>CAD</small>
                </div>
                <div className="mb-5">
                  {pkg.features.map(f => (
                    <div key={f.text} className={`text-[11px] py-1.5 border-b flex gap-2 items-center ${f.included ? '' : 'opacity-28'}`} style={{ borderColor: 'var(--border)', color: f.included ? 'var(--text-main)' : 'var(--text-muted)' }}>
                      <span className={f.included ? 'text-gold-2 font-bold' : ''}>{f.included ? '✓' : '—'}</span>
                      {f.text}
                    </div>
                  ))}
                </div>
                <Link href="/contact" className="block text-center py-2.5 border transition-all text-[10px] font-semibold tracking-[2px] uppercase hover:text-navy hover:bg-gold" style={{ borderColor: pkg.color, color: pkg.color }}>
                  Souscrire
                </Link>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-semibold tracking-[3px] uppercase mb-3" style={{ color: 'var(--text-muted)' }}>Sponsors Platine — {availableSlots.platine} places disponibles</p>
              <div className="flex gap-[2px]">
                {Array.from({ length: availableSlots.platine }).map((_, i) => (
                  <div key={i} className="flex-1 min-w-[120px] h-[72px] border border-dashed flex items-center justify-center text-[11px] font-medium tracking-[1.5px] cursor-pointer hover:bg-[rgba(200,155,60,.04)] hover:text-gold-2 hover:border-gold transition-all" style={{ background: 'var(--bg-2)', borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
                    + Votre logo ici
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-[3px] uppercase mb-3" style={{ color: 'var(--text-muted)' }}>Sponsors Or — {availableSlots.or} places disponibles</p>
              <div className="flex gap-[2px]">
                {Array.from({ length: availableSlots.or }).map((_, i) => (
                  <div key={i} className="flex-1 min-w-[120px] h-[72px] border border-dashed flex items-center justify-center text-[11px] font-medium tracking-[1.5px] cursor-pointer hover:bg-[rgba(200,155,60,.04)] hover:text-gold-2 hover:border-gold transition-all" style={{ background: 'var(--bg-2)', borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
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
