'use client'

import { useState } from 'react'
import { SITE } from '@/lib/site'

const faqItems = [
  { q: 'Où se déroule la FÉCOA 2026 ?', a: 'La foire aura lieu à Montréal, Québec, Canada. Le lieu exact sera confirmé en mars 2026.' },
  { q: 'Les billets sont-ils remboursables ?', a: "Oui, remboursement complet jusqu'à 7 jours avant l'événement. Après cette date, les billets ne sont plus remboursables mais transférables." },
  { q: 'Comment réserver un stand exposant ?', a: "Remplissez le formulaire ci-dessous ou contactez-nous à inscriptions@fecoa2026.ca. Réponse sous 7 jours." },
  { q: 'Y a-t-il un parking sur place ?', a: "Les informations pratiques (parking, transport en commun, hébergement) seront communiquées après confirmation du lieu." },
  { q: 'Puis-je participer plusieurs jours ?', a: "Oui ! Le forfait 4 jours (55 CAD) vous donne accès à toutes les journées. Des réductions sont disponibles pour les groupes de 10+." },
  { q: 'Les billets enfants sont-ils obligatoires ?', a: "Les enfants de moins de 5 ans entrent gratuitement. Les 5-12 ans bénéficient du tarif réduit de 8 CAD." },
]

const contactInfo = [
  { label: 'Général', value: SITE.emails.general, href: `mailto:${SITE.emails.general}`, icon: '✉' },
  { label: 'Exposants', value: SITE.emails.exhibitors, href: `mailto:${SITE.emails.exhibitors}`, icon: '🏪' },
  { label: 'Sponsors', value: SITE.emails.sponsors, href: `mailto:${SITE.emails.sponsors}`, icon: '🤝' },
  { label: 'Presse', value: SITE.emails.press, href: `mailto:${SITE.emails.press}`, icon: '📰' },
]

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [sent, setSent] = useState(false)

  return (
    <section className="py-[clamp(70px,9vh,128px)] px-[clamp(16px,5vw,80px)] pt-32">
      <div className="max-w-[1400px] mx-auto">
        <span className="eyebrow">Contact</span>
        <h2 className="sec-title">Nous <em>contacter</em></h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-[clamp(36px,6vw,76px)]">
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              {contactInfo.map(ci => (
                <a key={ci.label} href={ci.href} className="block p-5 border hover:border-gold/30 hover:bg-[rgba(200,155,60,.03)] transition-all group" style={{ borderColor: 'var(--border)' }}>
                  <span className="text-lg mb-2 block">{ci.icon}</span>
                  <span className="block text-[9px] font-bold tracking-[3px] uppercase text-gold-2 mb-1">{ci.label}</span>
                  <span className="text-[13px] group-hover:text-gold-2 transition-colors leading-relaxed" style={{ color: 'var(--text-main)' }}>{ci.value}</span>
                </a>
              ))}
            </div>

            <div className="space-y-4 mb-8">
              <div className="p-5 border" style={{ borderColor: 'var(--border)' }}>
                <span className="block text-[9px] font-bold tracking-[3px] uppercase text-gold-2 mb-1">Téléphone</span>
                <span className="text-[13px]" style={{ color: 'var(--text-main)' }}>{SITE.phone}</span>
              </div>
              <div className="p-5 border" style={{ borderColor: 'var(--border)' }}>
                <span className="block text-[9px] font-bold tracking-[3px] uppercase text-gold-2 mb-1">Lieu</span>
                <span className="text-[13px] leading-relaxed" style={{ color: 'var(--text-main)' }}>Montréal, Québec, Canada</span>
                <span className="block text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>Lieu confirmé mars 2026</span>
              </div>
            </div>

            <div>
              <span className="text-[9px] font-bold tracking-[3px] uppercase text-gold-2 mb-3 block">Suivez-nous</span>
              <div className="flex gap-2 flex-wrap">
                {Object.entries(SITE.social).map(([platform, url]) => (
                  <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border flex items-center justify-center hover:border-gold hover:text-gold-2 hover:bg-[rgba(200,155,60,.07)] transition-all text-[11px] uppercase" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
                    {platform.slice(0, 2)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            {sent ? (
              <div className="text-center py-20 border" style={{ borderColor: 'var(--border)' }}>
                <div className="w-14 h-14 rounded-full border-2 border-gold flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C89B3C" strokeWidth="2"><path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <h3 className="font-display text-[22px] mb-2" style={{ color: 'var(--text-main)' }}>Message envoyé !</h3>
                <p className="text-[13px]" style={{ color: 'var(--text-muted)' }}>Nous vous répondrons dans les plus brefs délais.</p>
                <button onClick={() => setSent(false)} className="text-gold-2 text-[11px] font-semibold tracking-[1px] uppercase mt-6 hover:underline">Envoyer un autre message</button>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true) }} className="border p-7" style={{ borderColor: 'var(--border)' }}>
                <h3 className="text-[11px] font-bold tracking-[2px] uppercase text-gold-2 mb-5">Envoyez-nous un message</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-semibold tracking-[2px] uppercase" style={{ color: 'var(--text-muted)' }}>Nom *</label>
                    <input type="text" required placeholder="Votre nom" className="border text-sm px-3.5 py-3 outline-none focus:border-gold transition-colors" style={{ background: 'var(--bg-3)', borderColor: 'var(--border)', color: 'var(--text-main)' }} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-semibold tracking-[2px] uppercase" style={{ color: 'var(--text-muted)' }}>Courriel *</label>
                    <input type="email" required placeholder="votre@email.com" className="border text-sm px-3.5 py-3 outline-none focus:border-gold transition-colors" style={{ background: 'var(--bg-3)', borderColor: 'var(--border)', color: 'var(--text-main)' }} />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 mb-4">
                  <label className="text-[10px] font-semibold tracking-[2px] uppercase" style={{ color: 'var(--text-muted)' }}>Objet</label>
                  <select className="border text-sm px-3.5 py-3 outline-none focus:border-gold transition-colors cursor-pointer" style={{ background: 'var(--bg-3)', borderColor: 'var(--border)', color: 'var(--text-main)' }}>
                    <option>Renseignements généraux</option>
                    <option>Inscription exposant</option>
                    <option>Sponsoring</option>
                    <option>Presse</option>
                    <option>Partenariat institutionnel</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5 mb-6">
                  <label className="text-[10px] font-semibold tracking-[2px] uppercase" style={{ color: 'var(--text-muted)' }}>Message *</label>
                  <textarea required placeholder="Votre message..." rows={5} className="border text-sm px-3.5 py-3 outline-none focus:border-gold transition-colors resize-y" style={{ background: 'var(--bg-3)', borderColor: 'var(--border)', color: 'var(--text-main)' }} />
                </div>
                <button type="submit" className="btn-gold w-full justify-center">Envoyer le message</button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-20 max-w-[800px] mx-auto">
          <div className="section-divider mb-10">
            <span style={{ background: '#C89B3C' }} />
            <span style={{ background: '#C0392B' }} />
            <span style={{ background: '#1A7A3C' }} />
            <span style={{ background: '#1A5276' }} />
          </div>
          <div className="text-center mb-10">
            <span className="eyebrow justify-center">Questions fréquentes</span>
            <h2 className="sec-title text-center">FAQ</h2>
          </div>
          <div className="space-y-[2px]">
            {faqItems.map((item, i) => (
              <div key={i} className="border" style={{ borderColor: 'var(--border)' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left bg-transparent hover:bg-[rgba(200,155,60,.03)] transition-colors" style={{ color: 'var(--text-main)' }}>
                  <span className="text-[13px] font-medium">{item.q}</span>
                  <span className={`text-xl ml-4 transition-transform duration-200 ${openFaq === i ? 'text-gold rotate-0' : ''}`} style={openFaq !== i ? { color: 'var(--text-muted)' } : {}}>{openFaq === i ? '−' : '+'}</span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-5 pb-5 text-[12px] leading-relaxed border-t pt-3" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
                    {item.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
