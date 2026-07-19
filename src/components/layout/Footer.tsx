import Link from 'next/link'
import Image from 'next/image'
import { SITE } from '@/lib/site'

const kenteColors = ['#C89B3C', '#C0392B', '#1A7A3C', '#1A5276']

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-[rgba(200,155,60,.12)]">
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
          <p className="text-[10px] tracking-[2px] uppercase text-muted mb-4">Foire Économique et Culturelle Ouest-Africaine</p>
          <p className="text-[13px] text-muted leading-relaxed max-w-[260px] mb-5">
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
          {['L\'événement', 'Programme', 'Billetterie', 'Exposants', 'Sponsors', 'Presse', 'Contact'].map(item => (
            <Link key={item} href={`/${item === 'L\'événement' ? '#about' : item.toLowerCase()}`} className="block text-[13px] text-muted mb-[9px] hover:text-gold-2 transition-colors">
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
            <Link key={item.label} href={item.href} className="block text-[13px] text-muted mb-[9px] hover:text-gold-2 transition-colors">
              {item.label}
            </Link>
          ))}
        </div>

        <div>
          <h4 className="text-[10px] font-bold tracking-[3px] uppercase text-gold-2 mb-4">Infos pratiques</h4>
          {['Accès & Transport', 'Hébergement partenaires', 'FAQ', 'Politique de confidentialité'].map(item => (
            <Link key={item} href="/contact" className="block text-[13px] text-muted mb-[9px] hover:text-gold-2 transition-colors">
              {item}
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto flex justify-between items-center py-[clamp(14px,2vw,22px)] px-[clamp(16px,4vw,56px)] border-t border-[rgba(255,255,255,.04)] flex-wrap gap-2">
        <span className="text-[11px] text-[rgba(122,143,168,.42)]">© 2026 FÉCOA — Tous droits réservés. Montréal, Québec, Canada.</span>
        <span className="font-display text-[17px] font-bold text-[rgba(200,155,60,.26)] tracking-[2px]">#FÉCOA2026</span>
      </div>
    </footer>
  )
}
