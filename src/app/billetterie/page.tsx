'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface TicketType {
  id: string
  name: string
  price: number
  description: string
  features: string[]
  popular?: boolean
  color: string
}

const tickets: TicketType[] = [
  { id: 'journee', name: 'Journée', price: 15, description: 'Accès à une journée au choix', features: ['Accès exposition', '1 journée au choix', 'Accès conférences publiques', 'Programme imprimé'], color: '#1A5276' },
  { id: 'enfant', name: 'Enfant (< 12 ans)', price: 8, description: 'Tarif réduit pour les enfants', features: ['Accès exposition', '1 journée au choix', 'Zone jeux & activités'], color: '#1A7A3C' },
  { id: 'forfait', name: 'Forfait 4 jours', price: 55, description: 'Accès complet à toutes les journées', features: ['Accès 4 jours complets', 'Toutes les conférences', 'Accès ateliers', 'Programme officiel', 'Badge visiteur'], popular: true, color: '#C89B3C' },
  { id: 'vip-journee', name: 'VIP Journée', price: 45, description: 'Expérience premium pour 1 journée', features: ['Espace VIP & lounge', '1 journée au choix', 'Buffet inclus', 'Meet & Greet speakers', 'Goodie bag VIP'], color: '#7D3C98' },
  { id: 'vip-forfait', name: 'VIP Forfait 4 jours', price: 150, description: "L'expérience ultime — accès complet VIP", features: ['Espace VIP les 4 jours', 'Buffet + cocktail VIP', 'Accès B2B Lounge', 'Meet & Greet exclusif', 'Goodie bag premium', 'Place concert réservée'], popular: true, color: '#E8B84B' },
  { id: 'gratuit', name: 'Moins de 5 ans', price: 0, description: 'Entrée gratuite', features: ['Accès accompagné', 'Activités enfants'], color: '#60a5fa' },
]

const promos = [
  { label: 'Early Bird', discount: 15, desc: 'Avant le 1er Nov 2026' },
  { label: 'Diaspora', discount: 10, desc: 'Résidants au Canada' },
  { label: 'Groupe 10+', discount: 20, desc: '10 billets ou plus' },
]

export default function BilletteriePage() {
  const router = useRouter()
  const [cart, setCart] = useState<Record<string, number>>({})
  const [promoCode, setPromoCode] = useState('')
  const [appliedPromo, setAppliedPromo] = useState<{ label: string; discount: number } | null>(null)
  const [step, setStep] = useState<'select' | 'cart' | 'payment'>('select')
  const [selectedPayment, setSelectedPayment] = useState<string>('stripe')
  const [paying, setPaying] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({ firstName: '', lastName: '', email: '', phone: '' })

  const addToCart = (id: string) => setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  const removeFromCart = (id: string) => {
    setCart(prev => {
      const n = { ...prev }
      if (n[id] && n[id] > 1) n[id]--; else delete n[id]
      return n
    })
  }

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0)
  const subtotal = Object.entries(cart).reduce((s, [id, qty]) => s + (tickets.find(t => t.id === id)?.price || 0) * qty, 0)
  const discount = appliedPromo ? Math.round(subtotal * appliedPromo.discount / 100) : 0
  const total = subtotal - discount

  const applyPromo = () => {
    const c = promoCode.toUpperCase()
    if (c === 'EARLYBIRD' || c === 'EARLY') setAppliedPromo({ label: 'Early Bird (-15%)', discount: 15 })
    else if (c === 'DIASPORA') setAppliedPromo({ label: 'Diaspora (-10%)', discount: 10 })
    else if (c === 'GROUPE') setAppliedPromo({ label: 'Groupe (-20%)', discount: 20 })
    else alert('Code promo invalide. Essayez : EARLYBIRD, DIASPORA ou GROUPE')
  }

  const inputCls = "border text-sm outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(200,155,60,.1)] transition-all duration-300"
  const inputStyle = { background: 'var(--bg-3)', borderColor: 'var(--border)', color: 'var(--text-main)' }

  return (
    <section className="py-[clamp(80px,10vh,140px)] px-[clamp(20px,5vw,80px)] pt-32">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-12">
          <span className="eyebrow">Billetterie</span>
          <h2 className="sec-title">Achetez vos <em>billets</em></h2>
          <p className="text-[clamp(14px,1.4vw,16px)] max-w-[520px] leading-[1.8]" style={{ color: 'var(--text-muted)' }}>
            Choisissez votre formule et réservez votre place pour la FÉCOA 2026.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-0 mb-14 border overflow-hidden max-w-[500px]" style={{ borderColor: 'var(--border)' }}>
          {[{ key: 'select', num: '01', label: 'Sélection' }, { key: 'cart', num: '02', label: 'Panier' }, { key: 'payment', num: '03', label: 'Paiement' }].map(s => (
            <button key={s.key} onClick={() => { if (s.key === 'select' || (s.key === 'cart' && totalItems > 0) || (s.key === 'payment' && totalItems > 0)) setStep(s.key as typeof step) }}
              className={`flex-1 flex items-center gap-3 px-5 py-4 transition-all duration-300 ${step === s.key ? 'bg-gold text-navy' : 'hover:bg-[rgba(200,155,60,.04)]'}`}
              style={step !== s.key ? { color: 'var(--text-muted)' } : {}}>
              <span className={`text-[10px] font-bold ${step === s.key ? 'text-navy' : 'text-gold'}`}>{s.num}</span>
              <span className="text-[11px] font-semibold tracking-[1.5px] uppercase">{s.label}</span>
            </button>
          ))}
        </div>

        {step === 'select' && (
          <>
            <div className="flex gap-3 flex-wrap mb-10">
              {promos.map(p => (
                <div key={p.label} className="flex items-center gap-3 px-4 py-2.5 border" style={{ borderColor: 'var(--border)', background: 'var(--bg-2)' }}>
                  <span className="text-[9px] font-bold tracking-[1px] uppercase px-2.5 py-0.5 bg-gold text-navy">{p.label}</span>
                  <span className="text-[12px]" style={{ color: 'var(--text-main)' }}><strong className="text-gold-2">-{p.discount}%</strong> — {p.desc}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[2px] border" style={{ borderColor: 'var(--border)' }}>
              {tickets.map(ticket => (
                <div key={ticket.id} className={`p-8 relative group ${ticket.popular ? 'ring-1 ring-gold/30' : ''}`} style={{ background: 'var(--bg-2)' }}>
                  <div className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" style={{ background: ticket.color }} />
                  {ticket.popular && <span className="absolute top-4 right-4 text-[8px] font-bold tracking-[1.5px] uppercase px-2.5 py-0.5 text-navy" style={{ background: ticket.color }}>Populaire</span>}
                  <div className="mb-5">
                    <div className="text-[9px] font-bold tracking-[3px] uppercase mb-2" style={{ color: ticket.color }}>{ticket.name}</div>
                    <div className="font-display text-[clamp(28px,2.5vw,40px)] font-bold leading-none mb-1" style={{ color: 'var(--text-main)' }}>
                      {ticket.price === 0 ? 'Gratuit' : <>{ticket.price} <small className="text-[13px] font-normal" style={{ color: 'var(--text-muted)' }}>CAD</small></>}
                    </div>
                    <p className="text-[12px] mt-2" style={{ color: 'var(--text-muted)' }}>{ticket.description}</p>
                  </div>
                  <ul className="mb-6 pt-5 border-t" style={{ borderColor: 'var(--border)' }}>
                    {ticket.features.map(f => (
                      <li key={f} className="text-[12px] py-1.5 flex gap-2.5 items-center" style={{ color: 'var(--text-main)' }}>
                        <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: ticket.color }} />{f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => addToCart(ticket.id)} className="w-full text-center py-3 border transition-all duration-300 text-[10px] font-semibold tracking-[2px] uppercase hover:text-navy hover:bg-gold hover:shadow-[0_4px_16px_rgba(200,155,60,.2)]" style={{ borderColor: ticket.color, color: ticket.color }}>
                    {ticket.price === 0 ? 'Réserver' : 'Ajouter au panier'}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {step === 'cart' && (
          <div className="max-w-[660px]">
            <h3 className="font-display text-[24px] font-bold mb-8" style={{ color: 'var(--text-main)' }}>Votre panier</h3>
            {totalItems === 0 ? (
              <div className="text-center py-20 border" style={{ borderColor: 'var(--border)' }}>
                <p className="mb-4" style={{ color: 'var(--text-muted)' }}>Votre panier est vide.</p>
                <button onClick={() => setStep('select')} className="text-gold-2 text-[12px] font-semibold tracking-[1px] uppercase hover:underline">Retour à la sélection</button>
              </div>
            ) : (
              <>
                <div className="border divide-y" style={{ borderColor: 'var(--border)' }}>
                  {Object.entries(cart).map(([id, qty]) => {
                    const t = tickets.find(t => t.id === id)!
                    return (
                      <div key={id} className="flex items-center justify-between p-5" style={{ background: 'var(--bg-2)' }}>
                        <div className="flex-1"><span className="text-[13px] font-semibold text-gold-2">{t.name}</span><span className="text-[12px] ml-2" style={{ color: 'var(--text-muted)' }}>{t.price === 0 ? 'Gratuit' : `${t.price} CAD / pièce`}</span></div>
                        <div className="flex items-center gap-5">
                          <div className="flex items-center gap-2">
                            <button onClick={() => removeFromCart(id)} className="w-8 h-8 border text-sm flex items-center justify-center transition-all duration-200 hover:border-gold hover:text-gold-2" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>−</button>
                            <span className="text-[14px] w-7 text-center font-medium" style={{ color: 'var(--text-main)' }}>{qty}</span>
                            <button onClick={() => addToCart(id)} className="w-8 h-8 border text-sm flex items-center justify-center transition-all duration-200 hover:border-gold hover:text-gold-2" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>+</button>
                          </div>
                          <span className="text-[14px] text-gold-2 font-semibold w-24 text-right">{t.price * qty} CAD</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="flex gap-2 mb-6 mt-5">
                  <input type="text" value={promoCode} onChange={e => setPromoCode(e.target.value)} placeholder="Code promo" className={`flex-1 px-4 py-3 ${inputCls}`} style={inputStyle} />
                  <button onClick={applyPromo} className="btn-outline !py-3 !px-6">Appliquer</button>
                </div>
                {appliedPromo && <p className="text-[12px] text-[#4ade80] mb-4 flex items-center gap-2"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round"/></svg>{appliedPromo.label} appliqué</p>}
                <div className="border-t pt-5 space-y-2.5" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex justify-between text-[14px]" style={{ color: 'var(--text-muted)' }}><span>Sous-total</span><span>{subtotal} CAD</span></div>
                  {discount > 0 && <div className="flex justify-between text-[14px] text-[#4ade80]"><span>Remise</span><span>-{discount} CAD</span></div>}
                  <div className="flex justify-between text-xl font-display font-bold text-gold-2 pt-4 border-t" style={{ borderColor: 'var(--border)' }}><span>Total</span><span>{total} CAD</span></div>
                </div>
                <div className="flex gap-3 mt-8">
                  <button onClick={() => setStep('select')} className="btn-outline">← Retour</button>
                  <button onClick={() => setStep('payment')} className="btn-gold flex-1 justify-center">Passer au paiement →</button>
                </div>
              </>
            )}
          </div>
        )}

        {step === 'payment' && (
          <div className="max-w-[660px]">
            <h3 className="font-display text-[24px] font-bold mb-8" style={{ color: 'var(--text-main)' }}>Paiement sécurisé</h3>
            <div className="p-7 mb-6 border" style={{ background: 'var(--bg-2)', borderColor: 'var(--border)' }}>
              <h4 className="text-[11px] font-bold tracking-[2px] uppercase text-gold-2 mb-5">Vos informations</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Prénom *" required value={customerInfo.firstName} onChange={e => setCustomerInfo({...customerInfo, firstName: e.target.value})} className={`px-4 py-3 ${inputCls}`} style={inputStyle} />
                <input type="text" placeholder="Nom *" required value={customerInfo.lastName} onChange={e => setCustomerInfo({...customerInfo, lastName: e.target.value})} className={`px-4 py-3 ${inputCls}`} style={inputStyle} />
                <input type="email" placeholder="Courriel *" required value={customerInfo.email} onChange={e => setCustomerInfo({...customerInfo, email: e.target.value})} className={`px-4 py-3 ${inputCls} md:col-span-2`} style={inputStyle} />
                <input type="tel" placeholder="Téléphone (optionnel)" value={customerInfo.phone} onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})} className={`px-4 py-3 ${inputCls} md:col-span-2`} style={inputStyle} />
              </div>
            </div>
            <div className="mb-6">
              <h4 className="text-[11px] font-bold tracking-[2px] uppercase text-gold-2 mb-5">Mode de paiement</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[2px] border" style={{ borderColor: 'var(--border)' }}>
                {[{ id: 'stripe', name: 'Stripe', icon: '💳', desc: 'Visa / Mastercard' }, { id: 'paypal', name: 'PayPal', icon: '🅿️', desc: 'Compte PayPal' }, { id: 'orange_money', name: 'Orange Money', icon: '🟠', desc: 'Mobile Money' }, { id: 'wave', name: 'Wave', icon: '🔵', desc: 'Mobile Money' }].map(m => (
                  <button key={m.id} onClick={() => setSelectedPayment(m.id)} className={`flex items-center gap-3 p-5 transition-all duration-300 text-left cursor-pointer ${selectedPayment === m.id ? 'bg-[rgba(200,155,60,.08)] border border-gold' : 'border border-transparent hover:bg-[rgba(200,155,60,.04)]'}`}
                    style={selectedPayment !== m.id ? { background: 'var(--bg-2)' } : {}}>
                    <span className="text-xl">{m.icon}</span>
                    <div className="flex-1"><span className="block text-[13px] font-semibold" style={{ color: 'var(--text-main)' }}>{m.name}</span><span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{m.desc}</span></div>
                    {selectedPayment === m.id && <span className="text-gold text-sm">✓</span>}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-6 mb-6 border" style={{ background: 'var(--bg-2)', borderColor: 'var(--border)' }}>
              <h4 className="text-[11px] font-bold tracking-[2px] uppercase text-gold-2 mb-4">Récapitulatif</h4>
              {Object.entries(cart).map(([id, qty]) => { const t = tickets.find(t => t.id === id)!; return <div key={id} className="flex justify-between text-[13px] py-2" style={{ color: 'var(--text-main)' }}><span>{qty}x {t.name}</span><span>{t.price * qty} CAD</span></div> })}
              {appliedPromo && <div className="flex justify-between text-[13px] text-[#4ade80] py-2"><span>Remise</span><span>-{discount} CAD</span></div>}
              <div className="flex justify-between text-xl font-display font-bold text-gold-2 mt-4 pt-4 border-t" style={{ borderColor: 'var(--border)' }}><span>Total</span><span>{total} CAD</span></div>
            </div>
            <p className="text-[12px] mb-5 flex items-center gap-2.5" style={{ color: 'var(--text-muted)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold flex-shrink-0"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Paiement 100% sécurisé. Billets envoyés par courriel avec QR code.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setStep('cart')} className="btn-outline">← Retour</button>
              <button className="btn-gold flex-1 justify-center disabled:opacity-50" disabled={paying || !customerInfo.firstName || !customerInfo.lastName || !customerInfo.email}
                onClick={async () => {
                  setPaying(true)
                  try {
                    const items = Object.entries(cart).map(([id, qty]) => ({ slug: id, quantity: qty }))
                    const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: customerInfo.email, firstName: customerInfo.firstName, lastName: customerInfo.lastName, phone: customerInfo.phone || undefined, items, promoCode: promoCode || undefined, paymentMethod: selectedPayment }) })
                    const data = await res.json()
                    if (data.paymentUrl) window.location.href = data.paymentUrl
                    else if (data.orderId) router.push(`/billetterie/confirmation?order=${data.orderId}`)
                    else alert(data.error || 'Erreur lors de la création de la commande')
                  } catch { alert('Erreur de connexion. Veuillez réessayer.') } finally { setPaying(false) }
                }}>
                {paying ? 'Redirection...' : `Payer ${total} CAD →`}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
