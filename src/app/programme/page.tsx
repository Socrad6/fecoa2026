import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Programme — FÉCOA 2026',
  description: 'Programme détaillé des 4 jours de la Foire Économique et Culturelle Ouest-Africaine. 17–20 Décembre 2026, Montréal.',
}

const days = [
  {
    date: '17',
    month: 'Déc',
    num: '01',
    title: 'Ouverture Officielle\n& Networking',
    tag: 'Cérémonie',
    tagColor: '#1A5276',
    desc: 'Journée inaugurale en présence des diplomates, élus et représentants des quatre nations.',
    agenda: [
      { time: '08h00', text: 'Accueil exposants — Remise des badges', badge: 'Exposants', badgeType: 'pro' },
      { time: '09h30', text: 'Cérémonie officielle d\'ouverture — Discours des dignitaires', badge: 'VIP', badgeType: 'vip' },
      { time: '10h30', text: 'Inauguration — Visite officielle des stands', badge: 'Public', badgeType: 'open' },
      { time: '11h00', text: 'Ouverture au public — Début des expositions', badge: 'Public', badgeType: 'open' },
      { time: '13h00', text: 'Forum B2B — Session 1 : Pitches startups africaines', badge: 'Pro', badgeType: 'pro' },
      { time: '15h00', text: 'Conférence : Investir en Afrique — Opportunités 2026-2030', badge: 'Public', badgeType: 'open' },
      { time: '16h30', text: 'Ateliers : Financement export / Droit des affaires', badge: 'Pro', badgeType: 'pro' },
      { time: '18h00', text: 'Cocktail VIP & Réception diplomatique', badge: 'VIP', badgeType: 'vip' },
    ],
  },
  {
    date: '18',
    month: 'Déc',
    num: '02',
    title: 'Commerce\n& Investissement',
    tag: 'Business',
    tagColor: '#1A7A3C',
    desc: 'Journée dédiée aux échanges commerciaux B2B structurés et aux opportunités d\'investissement.',
    agenda: [
      { time: '09h30', text: 'Conférence plénière : Corridors commerciaux Canada-Afrique', badge: 'Public', badgeType: 'open' },
      { time: '11h00', text: 'Matchmaking B2B — Série 1 (exposants + acheteurs)', badge: 'Pro', badgeType: 'pro' },
      { time: '12h30', text: 'Village gastronomique africain — Déjeuner', badge: 'Public', badgeType: 'open' },
      { time: '14h00', text: 'Table ronde : Femmes entrepreneures africaines au Canada', badge: 'Public', badgeType: 'open' },
      { time: '15h30', text: 'Matchmaking B2B — Série 2 (investisseurs + PME)', badge: 'Pro', badgeType: 'pro' },
      { time: '17h00', text: 'Panel : Fintech africaine — Révolution des paiements', badge: 'Pro', badgeType: 'pro' },
      { time: '18h30', text: 'Soirée networking — Musique live', badge: 'Public', badgeType: 'open' },
    ],
  },
  {
    date: '19',
    month: 'Déc',
    num: '03',
    title: 'Artisanat\n& Savoir-faire',
    tag: 'Artisanat',
    tagColor: '#7D3C98',
    desc: 'Célébration du génie créatif africain. Défilé de mode avec les créateurs de la diaspora.',
    agenda: [
      { time: '09h30', text: 'Journée de l\'artisanat — Ateliers démonstration', badge: 'Public', badgeType: 'open' },
      { time: '10h00', text: 'Masterclass : Valoriser l\'artisanat africain sur les marchés du Nord', badge: '30 places', badgeType: 'pro' },
      { time: '11h30', text: 'Concours live : Création en direct (tissu, bijoux, sculpture)', badge: 'Public', badgeType: 'open' },
      { time: '14h30', text: 'Atelier : Propriété intellectuelle et protection des créations', badge: 'Pro', badgeType: 'pro' },
      { time: '16h00', text: 'Défilé de mode africaine — Créateurs de la diaspora', badge: 'Public', badgeType: 'open' },
      { time: '17h30', text: 'Remise des Prix Artisanat FÉCOA 2026', badge: 'Cérémonie', badgeType: 'vip' },
    ],
  },
  {
    date: '20',
    month: 'Déc',
    num: '04',
    title: 'Clôture\n& Partenariats',
    tag: 'Clôture',
    tagColor: '#C0392B',
    desc: 'Signature des accords, remise des prix FÉCOA 2026 et annonce officielle de la prochaine édition.',
    agenda: [
      { time: '10h00', text: 'Signature accords & MOU — Cérémonie officielle', badge: 'Officiel', badgeType: 'vip' },
      { time: '11h30', text: 'Forum final : Bilan & vision FÉCOA 2027', badge: 'Public', badgeType: 'open' },
      { time: '13h00', text: 'Déjeuner de clôture — Partenaires et exposants', badge: 'VIP', badgeType: 'vip' },
      { time: '17h00', text: 'Cérémonie de clôture — Remise des prix FÉCOA 2026', badge: 'Public', badgeType: 'open' },
      { time: '19h00', text: 'Cocktail de clôture — Fin officielle', badge: 'VIP', badgeType: 'vip' },
      { time: '21h00', text: 'Démontage des stands (exposants)', badge: 'Exposants', badgeType: 'pro' },
    ],
  },
]

const badgeStyles: Record<string, string> = {
  vip: 'bg-[rgba(200,155,60,.14)] text-gold-2',
  open: 'bg-[rgba(26,122,60,.15)] text-[#4ade80]',
  pro: 'bg-[rgba(26,82,118,.2)] text-[#60a5fa]',
}

export default function ProgrammePage() {
  return (
    <section className="py-[clamp(70px,9vh,128px)] px-[clamp(16px,5vw,80px)] pt-32">
      <div className="max-w-[1400px] mx-auto">
        <span className="eyebrow">Programme</span>
        <h2 className="sec-title">Quatre jours <em>d&apos;exception</em></h2>
        <p className="text-[clamp(13px,1.4vw,15px)] text-muted max-w-[520px] leading-[1.8] mb-12">
          Un programme dense pour les entrepreneurs, artisans, investisseurs et le grand public.
        </p>

        <div className="space-y-12">
          {days.map(day => (
            <div key={day.date} className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-[clamp(28px,5vw,60px)] items-start border-b border-[rgba(200,155,60,.12)] pb-12">
              <div>
                <div className="font-display text-[80px] font-bold text-gold opacity-17 leading-[.85] mb-[-14px]">{day.num}</div>
                <h3 className="font-display text-[26px] font-bold text-white leading-[1.2] mb-3">
                  {day.title.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i === 0 && <br />}
                      {i === 1 && <span className="text-gold-2"> {line}</span>}
                    </span>
                  ))}
                </h3>
                <span className="inline-block px-3 py-1 text-[9px] font-bold tracking-[2px] uppercase text-white mb-4" style={{ background: day.tagColor }}>
                  {day.tag}
                </span>
                <p className="text-[13px] text-muted leading-[1.7]">{day.desc}</p>
              </div>

              <div className="flex flex-col gap-px">
                {day.agenda.map((item, i) => (
                  <div key={i} className="grid grid-cols-[82px_1fr_auto] items-center gap-3.5 py-3 px-4 bg-[rgba(255,255,255,.02)] border-l-2 border-transparent hover:bg-[rgba(200,155,60,.05)] hover:border-l-gold transition-all">
                    <b className="text-[11px] font-semibold tracking-[1px] text-gold-2 tabular-nums">{item.time}</b>
                    <span className="text-[13px] text-text font-light">{item.text}</span>
                    <span className={`text-[9px] font-bold tracking-[1px] uppercase px-2 py-0.5 rounded-full whitespace-nowrap ${badgeStyles[item.badgeType]}`}>
                      {item.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
