import Link from 'next/link'
import Image from 'next/image'
import { SITE } from '@/lib/site'

const kenteColors = ['#C89B3C', '#C0392B', '#1A7A3C', '#1A5276']

export default function Footer() {
  return (
    <footer className="border-t" style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}>
      <div className="kente-bar">
        {kenteColors.concat(kenteColors).map((c, i) => (
          <span key={i} style={{ background: c }} />
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-[2fr_1fr_1fr_1fr] gap-[clamp(28px,5vw,56px)] py-[clamp(36px,5vw,66px)] px-[clamp(16px,4vw,56px)]">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Image src="/logo/LOGO_FECAO_SANS_FOND.png" alt="FÉCOA" width={32} height={32} className="rounded-full" />
            <span className="font-display text-2xl font-bold tracking-[4px] text-gold">FÉCOA</span>
          </div>
          <p className="text-[10px] tracking-[2px] uppercase mb-4" style={{ color: 'var(--text-muted)' }}>Foire Économique et Culturelle Ouest-Africaine</p>
          <p className="text-[13px] leading-relaxed max-w-[260px] mb-5" style={{ color: 'var(--text-muted)' }}>
            Le rendez-vous incontournable des échanges entre le Canada et l&apos;Afrique de l&apos;Ouest. Montréal, {SITE.dates}.
          </p>
          <div className="flex gap-1.5 flex-wrap">
            {[
              { name: 'Sénégal', bg: '#1A7A3C' },
              { name: 'Guinée', bg: '#C0392B' },
              { name: 'Mali', bg: '#c9900a' },
              { name: 'Diaspora', bg: '#D52B1E' },
            ].map(n => (
              <span key={n.name} className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-[1px] text-white" style={{ background: n.bg }}>
                {n.name}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold tracking-[3px] uppercase text-gold-2 mb-4">Navigation</h4>
          {["L'événement", 'Programme', 'Billetterie', 'Exposants', 'Sponsors', 'Presse', 'Contact'].map(item => (
            <Link key={item} href={`/${item === "L'événement" ? '#about' : item.toLowerCase()}`} className="block text-[13px] mb-[9px] hover:text-gold-2 transition-colors" style={{ color: 'var(--text-muted)' }}>
              {item}
            </Link>
          ))}
        </div>

        <div>
          <h4 className="text-[10px] font-bold tracking-[3px] uppercase text-gold-2 mb-4">Billetterie</h4>
          {[
            { label: 'Acheter un billet', href: '/billetterie' },
            { label: 'Forfait VIP', href: '/billetterie' },
            { label: 'Devenir exposant', href: '/exposants' },
            { label: 'Devenir sponsor', href: '/sponsors' },
          ].map(item => (
            <Link key={item.label} href={item.href} className="block text-[13px] mb-[9px] hover:text-gold-2 transition-colors" style={{ color: 'var(--text-muted)' }}>
              {item.label}
            </Link>
          ))}
        </div>

        <div>
          <h4 className="text-[10px] font-bold tracking-[3px] uppercase text-gold-2 mb-4">Contact</h4>
          <a href={`mailto:${SITE.emails.general}`} className="block text-[13px] mb-[9px] hover:text-gold-2 transition-colors" style={{ color: 'var(--text-muted)' }}>{SITE.emails.general}</a>
          <span className="block text-[13px] mb-[9px]" style={{ color: 'var(--text-muted)' }}>{SITE.phone}</span>
          <span className="block text-[13px] mb-[9px]" style={{ color: 'var(--text-muted)' }}>{SITE.location}</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto flex justify-between items-center py-[clamp(14px,2vw,22px)] px-[clamp(16px,4vw,56px)] border-t flex-wrap gap-2" style={{ borderColor: 'var(--border)' }}>
        <span className="text-[11px]" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>© 2026 FÉCOA — Tous droits réservés. {SITE.location}.</span>
        <span className="font-display text-[17px] font-bold tracking-[2px]" style={{ color: 'var(--gold)', opacity: 0.3 }}>#FÉCOA2026</span>
      </div>
    </footer>
  )
}
