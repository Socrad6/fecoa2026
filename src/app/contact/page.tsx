'use client'

import { useState } from 'react'

const faqItems = [
  { q: 'Où se déroule la FÉCOA 2026 ?', a: 'La foire aura lieu à Montréal, Québec, Canada. Le lieu exact sera confirmé en mars 2026.' },
  { q: 'Les billets sont-ils remboursables ?', a: 'Oui, remboursement complet jusqu\'à 7 jours avant l\'événement. Après cette date, les billets ne sont plus remboursables mais transférables.' },
  { q: 'Comment réserver un stand exposant ?', a: 'Remplissez le formulaire sur la page Exposants ou contactez-nous à inscriptions@fecoa2026.ca. Réponse sous 7 jours.' },
  { q: 'Y a-t-il un parking sur place ?', a: 'Les informations pratiques (parking, transport en commun, hébergement) seront communiquées après confirmation du lieu.' },
  { q: 'Puis-je participer plusieurs jours ?', a: 'Oui ! Le forfait 4 jours (55 CAD) vous donne accès à toutes les journées. Des réductions sont disponibles pour les groupes de 10+.' },
  { q: 'Les billets enfants sont-ils obligatoires ?', a: 'Les enfants de moins de 5 ans entrent gratuitement. Les 5-12 ans bénéficient du tarif réduit de 8 CAD.' },
]

const contactInfo = [
  { label: 'Général', value: 'info@fecoa2026.ca', href: 'mailto:info@fecoa2026.ca' },
  { label: 'Exposants', value: 'inscriptions@fecoa2026.ca', href: 'mailto:inscriptions@fecoa2026.ca' },
  { label: 'Sponsors', value: 'sponsors@fecoa2026.ca', href: 'mailto:sponsors@fecoa2026.ca' },
  { label: 'Presse', value: 'presse@fecoa2026.ca', href: 'mailto:presse@fecoa2026.ca' },
]

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [sent, setSent] = useState(false)

  return (
    <section className="py-[clamp(70px,9vh,128px)] px-[clamp(16px,5vw,80px)] pt-32 bg-navy-2">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(36px,6vw,76px)]">
          {/* Contact info */}
          <div>
            <span className="eyebrow">Contact</span>
            <h2 className="sec-title">Nous <em>contacter</em></h2>

            <div className="space-y-6 mb-8">
              {contactInfo.map(ci => (
                <div key={ci.label}>
                  <span className="block text-[9px] font-bold tracking-[3px] uppercase text-gold-2 mb-1">{ci.label}</span>
                  <a href={ci.href} className="text-[14px] text-text hover:text-gold-2 transition-colors leading-relaxed">{ci.value}</a>
                </div>
              ))}
              <div>
                <span className="block text-[9px] font-bold tracking-[3px] uppercase text-gold-2 mb-1">Téléphone</span>
                <span className="text-[14px] text-text">+1 (514) xxx-xxxx</span>
              </div>
              <div>
                <span className="block text-[9px] font-bold tracking-[3px] uppercase text-gold-2 mb-1">Lieu</span>
                <span className="text-[14px] text-text leading-relaxed">Montréal, Québec, Canada<br /><span className="text-[12px] text-muted">Lieu confirmé mars 2026</span></span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-2 flex-wrap">
              {['Facebook', 'Instagram', 'LinkedIn', 'YouTube', 'TikTok'].map(s => (
                <a key={s} href="#" className="w-9 h-9 border border-[rgba(200,155,60,.12)] flex items-center justify-center text-muted hover:border-gold hover:text-gold-2 hover:bg-[rgba(200,155,60,.07)] transition-all text-[11px]">
                  {s.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div>
            {sent ? (
              <div className="text-center py-16">
                <div className="w-14 h-14 rounded-full border-2 border-gold flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C89B3C" strokeWidth="2"><path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <h3 className="font-display text-2xl text-white mb-2">Message envoyé !</h3>
                <p className="text-[14px] text-muted">Nous vous répondrons dans les plus brefs délais.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true) }} className="bg-navy border border-[rgba(200,155,60,.12)] p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-semibold tracking-[2px] uppercase text-muted">Nom *</label>
                    <input type="text" required placeholder="Votre nom" className="bg-[rgba(255,255,255,.04)] border border-[rgba(200,155,60,.13)] text-text px-3.5 py-3 text-sm outline-none focus:border-gold transition-colors" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-semibold tracking-[2px] uppercase text-muted">Courriel *</label>
                    <input type="email" required placeholder="votre@email.com" className="bg-[rgba(255,255,255,.04)] border border-[rgba(200,155,60,.13)] text-text px-3.5 py-3 text-sm outline-none focus:border-gold transition-colors" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 mb-4">
                  <label className="text-[10px] font-semibold tracking-[2px] uppercase text-muted">Objet</label>
                  <select className="bg-[rgba(255,255,255,.04)] border border-[rgba(200,155,60,.13)] text-text px-3.5 py-3 text-sm outline-none focus:border-gold transition-colors cursor-pointer">
                    <option>Renseignements généraux</option>
                    <option>Inscription exposant</option>
                    <option>Sponsoring</option>
                    <option>Presse</option>
                    <option>Partenariat institutionnel</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5 mb-6">
                  <label className="text-[10px] font-semibold tracking-[2px] uppercase text-muted">Message *</label>
                  <textarea required placeholder="Votre message..." rows={5} className="bg-[rgba(255,255,255,.04)] border border-[rgba(200,155,60,.13)] text-text px-3.5 py-3 text-sm outline-none focus:border-gold transition-colors resize-y" />
                </div>
                <button type="submit" className="btn-gold w-full justify-center">Envoyer le message</button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-[800px] mx-auto">
          <div className="text-center mb-10">
            <span className="eyebrow justify-center">Questions fréquentes</span>
            <h2 className="sec-title text-center">FAQ</h2>
          </div>
          <div className="space-y-2">
            {faqItems.map((item, i) => (
              <div key={i} className="border border-[rgba(200,155,60,.08)]">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left bg-transparent text-text hover:bg-[rgba(200,155,60,.03)] transition-colors">
                  <span className="text-[14px] font-medium">{item.q}</span>
                  <span className="text-gold text-xl ml-4">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-[13px] text-muted leading-relaxed border-t border-[rgba(200,155,60,.06)] pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
