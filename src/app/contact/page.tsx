'use client'

import { useState, useCallback } from 'react'
import type { Metadata } from 'next'
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
    <section className="py-[clamp(80px,10vh,140px)] px-[clamp(20px,5vw,80px)] pt-32 page-enter" aria-labelledby="contact-title">
      <div className="max-w-[1400px] mx-auto">
        <span className="eyebrow">Contact</span>
        <h1 id="contact-title" className="sec-title">Nous <em>contacter</em></h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-[clamp(40px,6vw,80px)]">
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {contactInfo.map(ci => (
                <a key={ci.label} href={ci.href} className="block p-6 border rounded-xl hover:border-gold/30 hover:bg-[rgba(200,155,60,.03)] transition-all duration-300 group card" style={{ borderColor: 'var(--color-border)' }}>
                  <span className="text-lg mb-3 block">{ci.icon}</span>
                  <span className="block text-[9px] font-bold tracking-[3px] uppercase text-gold-2 mb-1.5">{ci.label}</span>
                  <span className="text-[14px] group-hover:text-gold-2 transition-colors duration-300 leading-relaxed" style={{ color: 'var(--color-text)' }}>{ci.value}</span>
                </a>
              ))}
            </div>

            <div className="space-y-4 mb-10">
              <div className="p-6 border rounded-xl" style={{ borderColor: 'var(--color-border)' }}>
                <span className="block text-[9px] font-bold tracking-[3px] uppercase text-gold-2 mb-1.5">Téléphone</span>
                <span className="text-[14px]" style={{ color: 'var(--color-text)' }}>{SITE.phone}</span>
              </div>
              <div className="p-6 border rounded-xl" style={{ borderColor: 'var(--color-border)' }}>
                <span className="block text-[9px] font-bold tracking-[3px] uppercase text-gold-2 mb-1.5">Lieu</span>
                <span className="text-[14px] leading-relaxed" style={{ color: 'var(--color-text)' }}>Montréal, Québec, Canada</span>
                <span className="block text-[12px] mt-1" style={{ color: 'var(--color-muted)' }}>Lieu confirmé mars 2026</span>
              </div>
            </div>

            <div>
              <span className="text-[9px] font-bold tracking-[3px] uppercase text-gold-2 mb-4 block">Suivez-nous</span>
              <div className="flex gap-2 flex-wrap">
                {Object.entries(SITE.social).map(([platform, url]) => (
                  <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border rounded-full flex items-center justify-center hover:border-gold hover:text-gold-2 hover:bg-[rgba(200,155,60,.07)] transition-all duration-300 text-[11px] uppercase" style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }} aria-label={`Suivez-nous sur ${platform}`}>
                    {platform.slice(0, 2)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            {sent ? (
              <div className="text-center py-24 border rounded-xl" style={{ borderColor: 'var(--color-border)' }}>
                <div className="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center mx-auto mb-5" style={{ animation: 'pulse-gold 2s infinite' }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C89B3C" strokeWidth="2" aria-hidden="true"><path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <h2 className="font-display text-[26px] mb-3" style={{ color: 'var(--color-text)' }}>Message envoyé !</h2>
                <p className="text-[14px]" style={{ color: 'var(--color-muted)' }}>Nous vous répondrons dans les plus brefs délais.</p>
                <button onClick={() => setSent(false)} className="text-gold-2 text-[12px] font-semibold tracking-[1px] uppercase mt-8 hover:underline">Envoyer un autre message</button>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true) }} className="border p-8 rounded-xl" style={{ borderColor: 'var(--color-border)' }}>
                <h2 className="text-[11px] font-bold tracking-[2px] uppercase text-gold-2 mb-6">Envoyez-nous un message</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-name" className="text-[10px] font-semibold tracking-[2px] uppercase" style={{ color: 'var(--color-muted)' }}>Nom *</label>
                    <input id="contact-name" type="text" required placeholder="Votre nom" className="border text-sm px-4 py-3 outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(200,155,60,.1)] transition-all duration-300 rounded-lg" style={{ background: 'var(--color-bg-3)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-email" className="text-[10px] font-semibold tracking-[2px] uppercase" style={{ color: 'var(--color-muted)' }}>Courriel *</label>
                    <input id="contact-email" type="email" required placeholder="votre@email.com" className="border text-sm px-4 py-3 outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(200,155,60,.1)] transition-all duration-300 rounded-lg" style={{ background: 'var(--color-bg-3)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} />
                  </div>
                </div>
                <div className="flex flex-col gap-2 mb-5">
                  <label htmlFor="contact-subject" className="text-[10px] font-semibold tracking-[2px] uppercase" style={{ color: 'var(--color-muted)' }}>Objet</label>
                  <select id="contact-subject" className="border text-sm px-4 py-3 outline-none focus:border-gold transition-all duration-300 cursor-pointer rounded-lg" style={{ background: 'var(--color-bg-3)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
                    <option>Renseignements généraux</option>
                    <option>Inscription exposant</option>
                    <option>Sponsoring</option>
                    <option>Presse</option>
                    <option>Partenariat institutionnel</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 mb-7">
                  <label htmlFor="contact-message" className="text-[10px] font-semibold tracking-[2px] uppercase" style={{ color: 'var(--color-muted)' }}>Message *</label>
                  <textarea id="contact-message" required placeholder="Votre message..." rows={5} className="border text-sm px-4 py-3 outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(200,155,60,.1)] transition-all duration-300 resize-y rounded-lg" style={{ background: 'var(--color-bg-3)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} />
                </div>
                <button type="submit" className="btn-gold w-full justify-center">Envoyer le message</button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-24 max-w-[800px] mx-auto">
          <div className="section-divider mb-12" aria-hidden="true">
            <span style={{ background: '#C89B3C' }} />
            <span style={{ background: '#C0392B' }} />
            <span style={{ background: '#1A7A3C' }} />
            <span style={{ background: '#1A5276' }} />
          </div>
          <div className="text-center mb-12">
            <span className="eyebrow justify-center">Questions fréquentes</span>
            <h2 className="sec-title text-center">FAQ</h2>
          </div>
          <div className="space-y-[2px]" role="list" aria-label="Questions fréquentes">
            {faqItems.map((item, i) => (
              <div key={i} className="border rounded-xl overflow-hidden" style={{ borderColor: 'var(--color-border)' }} role="listitem">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left bg-transparent hover:bg-[rgba(200,155,60,.03)] transition-colors duration-300" style={{ color: 'var(--color-text)' }} aria-expanded={openFaq === i}>
                  <span className="text-[14px] font-medium pr-4">{item.q}</span>
                  <span className={`text-xl ml-4 transition-transform duration-300 flex-shrink-0 ${openFaq === i ? 'text-gold rotate-0' : ''}`} style={openFaq !== i ? { color: 'var(--color-muted)' } : {}} aria-hidden="true">{openFaq === i ? '−' : '+'}</span>
                </button>
                <div className={`overflow-hidden transition-all duration-400 ${openFaq === i ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`} role="region">
                  <div className="px-6 pb-6 text-[13px] leading-relaxed border-t pt-4" style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}>
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
