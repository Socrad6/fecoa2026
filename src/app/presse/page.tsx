import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Presse',
  description: 'Espace presse FÉCOA 2026. Accréditation officielle gratuite pour journalistes, photographes, vidéastes et créateurs de contenu.',
}

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
    <section className="py-[clamp(80px,10vh,140px)] px-[clamp(20px,5vw,80px)] pt-32 page-enter" aria-labelledby="presse-title">
      <div className="max-w-[1400px] mx-auto">
        <span className="eyebrow">Presse & Médias</span>
        <h1 id="presse-title" className="sec-title">Espace <em>presse</em></h1>
        <p className="text-[clamp(14px,1.4vw,16px)] max-w-[520px] leading-[1.8] mb-14" style={{ color: 'var(--color-muted)' }}>
          Accréditation officielle gratuite pour journalistes, photographes, vidéastes et créateurs de contenu.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-[clamp(28px,3vw,44px)] relative group rounded-xl card" role="article">
            <h2 className="font-display text-[26px] font-bold mb-4" style={{ color: 'var(--color-text)' }}>Accréditation médias</h2>
            <p className="text-[14px] mb-6 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              Journalistes, photographes, vidéastes et créateurs de contenu — accréditation officielle gratuite.
            </p>
            <ul className="space-y-2.5 mb-8" role="list">
              {pressFeatures.map(f => (
                <li key={f} className="text-[13px] flex gap-2.5 items-start" style={{ color: 'var(--color-text)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/contact" className="btn-outline inline-flex">
              Demander l&apos;accréditation
            </Link>
          </div>

          <div className="p-[clamp(28px,3vw,44px)] relative group rounded-xl card" role="article">
            <h2 className="font-display text-[26px] font-bold mb-4" style={{ color: 'var(--color-text)' }}>Angles éditoriaux</h2>
            <p className="text-[14px] mb-6 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              Nombreux angles pour les médias francophones, anglophones et africains.
            </p>
            <ul className="space-y-2.5 mb-8" role="list">
              {editorialAngles.map(a => (
                <li key={a} className="text-[13px] flex gap-2.5 items-start" style={{ color: 'var(--color-text)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" aria-hidden="true" />
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
