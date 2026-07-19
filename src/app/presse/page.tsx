import Link from 'next/link'

const pressFeatures = [
  'Accès toutes zones (sauf espaces VIP privés)',
  'Salle de presse équipée (Wi-Fi, espaces de travail)',
  'Conférences de presse quotidiennes à 12h30',
  'Interviews arrangées avec les organisateurs',
  'Dossier de presse complet — photos HD',
]

const editorialAngles = [
  "L'entrepreneuriat africain au Canada en pleine ascension",
  'Montréal, capitale de la francophonie africaine',
  'La diaspora africaine, moteur économique méconnu',
  'Femmes leaders africaines : innovation et résilience',
  'Gastronomie africaine à Montréal',
  'Fintech africaine et corridors financiers',
]

export default function PressePage() {
  return (
    <section className="py-[clamp(80px,10vh,140px)] px-[clamp(20px,5vw,80px)] pt-32">
      <div className="max-w-[1400px] mx-auto">
        <span className="eyebrow">Presse & Médias</span>
        <h2 className="sec-title">Espace <em>presse</em></h2>
        <p className="text-[clamp(14px,1.4vw,16px)] max-w-[520px] leading-[1.8] mb-14" style={{ color: 'var(--text-muted)' }}>
          Accréditation officielle gratuite pour journalistes, photographes, vidéastes et créateurs de contenu.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] border" style={{ borderColor: 'var(--border)' }}>
          <div className="p-[clamp(28px,3vw,44px)] relative group" style={{ background: 'var(--bg-2)' }}>
            <div className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 bg-gold" />
            <h3 className="font-display text-[26px] font-bold mb-4" style={{ color: 'var(--text-main)' }}>Accréditation médias</h3>
            <p className="text-[14px] mb-6 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Journalistes, photographes, vidéastes et créateurs de contenu — accréditation officielle gratuite.
            </p>
            <ul className="space-y-2.5 mb-8">
              {pressFeatures.map(f => (
                <li key={f} className="text-[13px] flex gap-2.5 items-start" style={{ color: 'var(--text-main)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/contact" className="btn-outline inline-flex">
              Demander l&apos;accréditation
            </Link>
          </div>

          <div className="p-[clamp(28px,3vw,44px)] relative group" style={{ background: 'var(--bg-2)' }}>
            <div className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 bg-[#C89B3C]" />
            <h3 className="font-display text-[26px] font-bold mb-4" style={{ color: 'var(--text-main)' }}>Angles éditoriaux</h3>
            <p className="text-[14px] mb-6 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Nombreux angles pour les médias francophones, anglophones et africains.
            </p>
            <ul className="space-y-2.5 mb-8">
              {editorialAngles.map(a => (
                <li key={a} className="text-[13px] flex gap-2.5 items-start" style={{ color: 'var(--text-main)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                  {a}
                </li>
              ))}
            </ul>
            <a href="mailto:presse@fecoa2026.ca" className="btn-outline inline-flex">
              presse@fecoa2026.ca
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
