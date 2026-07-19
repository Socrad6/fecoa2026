import Link from 'next/link'
import Image from 'next/image'
import { SITE } from '@/lib/site'

const kenteColors = ['#C89B3C', '#C0392B', '#1A7A3C', '#1A5276']

const socialIcons: Record<string, string> = {
  facebook: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
  instagram: 'M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z',
  linkedin: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z',
  youtube: 'M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z',
  tiktok: 'M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z',
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg)' }}>
      <div className="kente-bar">
        {kenteColors.concat(kenteColors).map((c, i) => (
          <span key={i} style={{ background: c }} />
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,56px)]">
        {/* Main footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-[clamp(32px,5vw,56px)] py-[clamp(48px,6vw,80px)]">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-[44px] h-[44px] rounded-full border border-[rgba(200,155,60,.25)] p-0.5">
                <Image src="/logo/LOGO_FECAO_SANS_FOND.png" alt="FÉCOA" width={40} height={40} className="w-full h-full object-contain rounded-full" />
              </div>
              <div>
                <span className="font-display text-[22px] font-bold tracking-[4px] text-gold">FÉCOA</span>
                <span className="block text-[9px] tracking-[2px] uppercase" style={{ color: 'var(--text-muted)' }}>2026</span>
              </div>
            </div>
            <p className="text-[10px] tracking-[2px] uppercase mb-5" style={{ color: 'var(--text-muted)' }}>Foire Économique et Culturelle Ouest-Africaine</p>
            <p className="text-[13px] leading-[1.8] max-w-[280px] mb-6" style={{ color: 'var(--text-muted)' }}>
              Le rendez-vous incontournable des échanges entre le Canada et l&apos;Afrique de l&apos;Ouest.
            </p>
            <div className="flex gap-1.5 flex-wrap mb-6">
              {[
                { name: 'Sénégal', bg: '#1A7A3C' },
                { name: 'Guinée', bg: '#C0392B' },
                { name: 'Mali', bg: '#c9900a' },
                { name: 'Diaspora', bg: '#D52B1E' },
              ].map(n => (
                <span key={n.name} className="px-3 py-1 text-[10px] font-semibold tracking-[1px] text-white rounded-full" style={{ background: n.bg }}>
                  {n.name}
                </span>
              ))}
            </div>
            <div className="flex gap-1.5">
              {Object.entries(SITE.social).map(([platform, url]) => (
                <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[rgba(200,155,60,.1)] hover:text-gold hover:shadow-[0_0_12px_rgba(200,155,60,.12)] border border-transparent hover:border-[rgba(200,155,60,.2)]" style={{ color: 'var(--text-muted)' }} aria-label={platform}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={socialIcons[platform]} /></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[3px] uppercase text-gold-2 mb-5 flex items-center gap-2">
              <span className="w-5 h-px bg-gold/30" />
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {[{ label: 'L\'événement', href: '/#about' }, { label: 'Programme', href: '/programme' }, { label: 'Billetterie', href: '/billetterie' }, { label: 'Exposants', href: '/exposants' }, { label: 'Sponsors', href: '/sponsors' }, { label: 'Presse', href: '/presse' }, { label: 'Contact', href: '/contact' }].map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="text-[13px] hover:text-gold-2 transition-colors duration-300 flex items-center gap-2 group" style={{ color: 'var(--text-muted)' }}>
                    <span className="w-0 h-px bg-gold transition-all duration-300 group-hover:w-3" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Billetterie */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[3px] uppercase text-gold-2 mb-5 flex items-center gap-2">
              <span className="w-5 h-px bg-gold/30" />
              Billetterie
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Acheter un billet', href: '/billetterie' },
                { label: 'Forfait VIP', href: '/billetterie' },
                { label: 'Devenir exposant', href: '/exposants' },
                { label: 'Devenir sponsor', href: '/sponsors' },
              ].map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="text-[13px] hover:text-gold-2 transition-colors duration-300 flex items-center gap-2 group" style={{ color: 'var(--text-muted)' }}>
                    <span className="w-0 h-px bg-gold transition-all duration-300 group-hover:w-3" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[3px] uppercase text-gold-2 mb-5 flex items-center gap-2">
              <span className="w-5 h-px bg-gold/30" />
              Contact
            </h4>
            <ul className="space-y-3.5">
              <li>
                <a href={`mailto:${SITE.emails.general}`} className="text-[13px] hover:text-gold-2 transition-colors duration-300 flex items-start gap-2.5" style={{ color: 'var(--text-muted)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mt-0.5 flex-shrink-0"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  {SITE.emails.general}
                </a>
              </li>
              <li>
                <span className="text-[13px] flex items-start gap-2.5" style={{ color: 'var(--text-muted)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mt-0.5 flex-shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  {SITE.phone}
                </span>
              </li>
              <li>
                <span className="text-[13px] flex items-start gap-2.5" style={{ color: 'var(--text-muted)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mt-0.5 flex-shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {SITE.location}
                </span>
              </li>
              <li>
                <span className="text-[13px] flex items-start gap-2.5" style={{ color: 'var(--text-muted)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mt-0.5 flex-shrink-0"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  {SITE.dates}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex justify-between items-center py-6 border-t flex-wrap gap-3" style={{ borderColor: 'var(--border)' }}>
          <span className="text-[11px]" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>© 2026 FÉCOA — Tous droits réservés.</span>
          <div className="flex items-center gap-4">
            <span className="text-[10px] tracking-[2px] uppercase" style={{ color: 'var(--text-muted)', opacity: 0.4 }}>{SITE.location}</span>
            <span className="font-display text-[16px] font-bold tracking-[2px]" style={{ color: 'var(--gold)', opacity: 0.25 }}>#FÉCOA2026</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
