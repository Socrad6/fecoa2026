import Link from 'next/link'

const pressFeatures = [
  'Accès toutes zones (sauf espaces VIP privés)',
  'Salle de presse équipée (Wi-Fi, espaces de travail)',
  'Conférences de presse quotidiennes à 12h30',
  'Interviews arrangées avec les organisateurs',
  'Dossier de presse complet — photos HD',
]

const editorialAngles = [
  'L\'entrepreneuriat africain au Canada en pleine ascension',
  'Montréal, capitale de la francophonie africaine',
  'La diaspora africaine, moteur économique méconnu',
  'Femmes leaders africaines : innovation et résilience',
  'Gastronomie africaine à Montréal',
  'Fintech africaine et corridors financiers',
]

export default function PressePage() {
  return (
    <section className="py-[clamp(70px,9vh,128px)] px-[clamp(16px,5vw,80px)] pt-32">
      <div className="max-w-[1400px] mx-auto">
        <span className="eyebrow">Presse & Médias</span>
        <h2 className="sec-title">Espace <em>presse</em></h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(20px,4vw,44px)]">
          <div className="border border-[rgba(200,155,60,.12)] p-[clamp(22px,3vw,38px)] hover:border-[rgba(200,155,60,.26)] transition-colors bg-[rgba(255,255,255,.01)]">
            <h3 className="font-display text-[22px] font-bold text-white mb-3">Accréditation médias</h3>
            <p className="text-[14px] text-muted mb-5 leading-relaxed">
              Journalistes, photographes, vidéastes et créateurs de contenu — accréditation officielle gratuite.
            </p>
            <ul className="space-y-1.5">
              {pressFeatures.map(f => (
                <li key={f} className="text-[13px] text-text flex gap-2.5 items-start">
                  <span className="text-gold text-[11px] mt-0.5 flex-shrink-0">→</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/contact" className="btn-outline mt-6 inline-flex">
              Demander l&apos;accréditation
            </Link>
          </div>

          <div className="border border-[rgba(200,155,60,.12)] p-[clamp(22px,3vw,38px)] hover:border-[rgba(200,155,60,.26)] transition-colors bg-[rgba(255,255,255,.01)]">
            <h3 className="font-display text-[22px] font-bold text-white mb-3">Angles éditoriaux</h3>
            <p className="text-[14px] text-muted mb-5 leading-relaxed">
              Nombreux angles pour les médias francophones, anglophones et africains.
            </p>
            <ul className="space-y-1.5">
              {editorialAngles.map(a => (
                <li key={a} className="text-[13px] text-text flex gap-2.5 items-start">
                  <span className="text-gold text-[11px] mt-0.5 flex-shrink-0">→</span>
                  {a}
                </li>
              ))}
            </ul>
            <a href="mailto:presse@fecoa2026.ca" className="btn-outline mt-6 inline-flex">
              presse@fecoa2026.ca
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
