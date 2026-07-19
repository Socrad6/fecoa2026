'use client'

export default function Ticker() {
  const items = [
    '250+ Exposants', '5 000+ Visiteurs', 'Forum B2B', 'Artisanat & Mode',
    'Gastronomie', 'Conférences', 'Sénégal · Guinée · Mali', 'Diaspora à Montréal', '17–20 Déc 2026',
  ]
  const duplicated = [...items, ...items]

  return (
    <div className="overflow-hidden border-t border-b border-[rgba(200,155,60,.12)] py-4 bg-[rgba(200,155,60,.03)]">
      <div className="flex whitespace-nowrap animate-[ticker_28s_linear_infinite]">
        {duplicated.map((item, i) => (
          <span key={i} className="text-[13px] font-medium tracking-[2px] text-muted px-7">
            {item} <em className="text-gold not-italic">◆</em>
          </span>
        ))}
      </div>
    </div>
  )
}
