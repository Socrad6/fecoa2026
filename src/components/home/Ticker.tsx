'use client'

export default function Ticker() {
  const items = [
    '250+ Exposants', '5 000+ Visiteurs', 'Forum B2B', 'Artisanat & Mode',
    'Gastronomie', 'Conférences', 'Sénégal · Guinée · Mali', 'Diaspora à Montréal', '17–20 Déc 2026',
  ]
  const duplicated = [...items, ...items]

  return (
    <div className="overflow-hidden border-t border-b py-4.5" style={{ borderColor: 'var(--border)', background: 'var(--bg-2)' }}>
      <div className="flex whitespace-nowrap animate-[ticker_28s_linear_infinite]">
        {duplicated.map((item, i) => (
          <span key={i} className="text-[13px] font-medium tracking-[2px] px-8 flex items-center gap-8" style={{ color: 'var(--text-muted)' }}>
            {item}
            <span className="text-gold text-[6px]">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
