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
  {
    id: 'journee',
    name: 'Journée',
    price: 15,
    description: 'Accès à une journée au choix',
    features: ['Accès exposition', '1 journée au choix', 'Accès conférences publiques', 'Programme imprimé'],
    color: '#1A5276',
  },
  {
    id: 'enfant',
    name: 'Enfant (< 12 ans)',
    price: 8,
    description: 'Tarif réduit pour les enfants',
    features: ['Accès exposition', '1 journée au choix', 'Zone jeux & activités'],
    color: '#1A7A3C',
  },
  {
    id: 'forfait',
    name: 'Forfait 4 jours',
    price: 55,
    description: 'Accès complet à toutes les journées',
    features: ['Accès 4 jours complets', 'Toutes les conférences', 'Accès ateliers', 'Programme officiel', 'Badge visiteur'],
    popular: true,
    color: '#C89B3C',
  },
  {
    id: 'vip-journee',
    name: 'VIP Journée',
    price: 45,
    description: 'Expérience premium pour 1 journée',
    features: ['Espace VIP & lounge', '1 journée au choix', 'Buffet inclus', 'Meet & Greet speakers', 'Goodie bag VIP'],
    color: '#7D3C98',
  },
  {
    id: 'vip-forfait',
    name: 'VIP Forfait 4 jours',
    price: 150,
    description: "L'expérience ultime — accès complet VIP",
    features: ['Espace VIP les 4 jours', 'Buffet + cocktail VIP', 'Accès B2B Lounge', 'Meet & Greet exclusif', 'Goodie bag premium', 'Place concert réservée'],
    popular: true,
    color: '#E8B84B',
  },
  {
    id: 'gratuit',
    name: 'Moins de 5 ans',
    price: 0,
    description: 'Entrée gratuite',
    features: ['Accès accompagné', 'Activités enfants'],
    color: '#60a5fa',
  },
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

  const addToCart = (id: string) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  }

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const newCart = { ...prev }
      if (newCart[id] && newCart[id] > 1) newCart[id]--
      else delete newCart[id]
      return newCart
    })
  }

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0)
  const subtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const ticket = tickets.find(t => t.id === id)
    return sum + (ticket?.price || 0) * qty
  }, 0)
  const discount = appliedPromo ? Math.round(subtotal * appliedPromo.discount / 100) : 0
  const total = subtotal - discount

  const applyPromo = () => {
    const code = promoCode.toUpperCase()
    if (code === 'EARLYBIRD' || code === 'EARLY') setAppliedPromo({ label: 'Early Bird (-15%)', discount: 15 })
    else if (code === 'DIASPORA') setAppliedPromo({ label: 'Diaspora (-10%)', discount: 10 })
    else if (code === 'GROUPE') setAppliedPromo({ label: 'Groupe (-20%)', discount: 20 })
    else alert('Code promo invalide. Essayez : EARLYBIRD, DIASPORA ou GROUPE')
  }

  const steps = [
    { key: 'select', num: '01', label: 'Sélection' },
    { key: 'cart', num: '02', label: 'Panier' },
    { key: 'payment', num: '03', label: 'Paiement' },
  ]

  return (
    <section className="py-[clamp(70px,9vh,128px)] px-[clamp(16px,5vw,80px)] pt-32">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-10">
          <span className="eyebrow">Billetterie</span>
          <h2 className="sec-title">Achetez vos <em>billets</em></h2>
          <p className="text-[clamp(13px,1.4vw,15px)] text-muted max-w-[520px] leading-[1.8]">
            Choisissez votre formule et réservez votre place pour la FÉCOA 2026.
          </p>
        </div>

        {/* Step indicator — horizontal clean */}
        <div className="flex items-center gap-0 mb-12 border border-[rgba(200,155,60,.12)] overflow-hidden max-w-[480px]">
          {steps.map((s, i) => (
            <button
              key={s.key}
              onClick={() => { if (s.key === 'select' || (s.key === 'cart' && totalItems > 0) || (s.key === 'payment' && totalItems > 0)) setStep(s.key as typeof step) }}
              className={`flex-1 flex items-center gap-3 px-5 py-3.5 transition-all duration-300 ${
                step === s.key
                  ? 'bg-gold text-navy'
                  : 'bg-transparent text-muted hover:bg-[rgba(200,155,60,.04)]'
              }`}
            >
              <span className={`text-[10px] font-bold ${step === s.key ? 'text-navy' : 'text-gold'}`}>{s.num}</span>
              <span className="text-[11px] font-semibold tracking-[1.5px] uppercase">{s.label}</span>
            </button>
          ))}
        </div>

        {/* STEP 1 — Sélection */}
        {step === 'select' && (
          <>
            {/* Promo badges */}
            <div className="flex gap-3 flex-wrap mb-8">
              {promos.map(p => (
                <div key={p.label} className="flex items-center gap-2.5 px-4 py-2 border border-[rgba(200,155,60,.12)] bg-[rgba(200,155,60,.04)]">
                  <span className="text-[9px] font-bold tracking-[1px] uppercase px-2 py-0.5 bg-gold text-navy">{p.label}</span>
                  <span className="text-[12px] text-text"><strong className="text-gold-2">-{p.discount}%</strong> — {p.desc}</span>
                </div>
              ))}
            </div>

            {/* Tickets grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[2px] bg-[rgba(200,155,60,.12)] border border-[rgba(200,155,60,.12)]">
              {tickets.map(ticket => (
                <div key={ticket.id} className={`bg-navy-2 p-7 relative group ${ticket.popular ? 'ring-1 ring-gold/30' : ''}`}>
                  {/* Top color bar */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" style={{ background: ticket.color }} />

                  {ticket.popular && (
                    <span className="absolute top-3 right-3 text-[8px] font-bold tracking-[1.5px] uppercase px-2 py-0.5 text-navy" style={{ background: ticket.color }}>
                      Populaire
                    </span>
                  )}

                  <div className="mb-4">
                    <div className="text-[9px] font-bold tracking-[3px] uppercase mb-2" style={{ color: ticket.color }}>{ticket.name}</div>
                    <div className="font-display text-[clamp(26px,2.5vw,38px)] font-bold text-white leading-none mb-1">
                      {ticket.price === 0 ? 'Gratuit' : <>{ticket.price} <small className="text-[12px] text-muted font-normal">CAD</small></>}
                    </div>
                    <p className="text-[11px] text-muted mt-1">{ticket.description}</p>
                  </div>

                  <ul className="mb-5 pt-4 border-t border-[rgba(200,155,60,.08)]">
                    {ticket.features.map(f => (
                      <li key={f} className="text-[11px] text-text py-1 flex gap-2.5 items-center">
                        <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: ticket.color }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button onClick={() => addToCart(ticket.id)} className="w-full text-center py-2.5 border transition-all text-[10px] font-semibold tracking-[2px] uppercase hover:text-navy" style={{ borderColor: ticket.color, color: ticket.color }}
                    onMouseEnter={e => { e.currentTarget.style.background = ticket.color }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
                    {ticket.price === 0 ? 'Réserver' : 'Ajouter au panier'}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* STEP 2 — Panier */}
        {step === 'cart' && (
          <div className="max-w-[640px]">
            <h3 className="font-display text-[22px] font-bold text-white mb-6">Votre panier</h3>
            {totalItems === 0 ? (
              <div className="text-center py-16 border border-[rgba(200,155,60,.08)]">
                <p className="text-muted mb-3">Votre panier est vide.</p>
                <button onClick={() => setStep('select')} className="text-gold-2 text-[12px] font-semibold tracking-[1px] uppercase hover:underline">Retour à la sélection</button>
              </div>
            ) : (
              <>
                {/* Cart items */}
                <div className="border border-[rgba(200,155,60,.08)] divide-y divide-[rgba(200,155,60,.06)] mb-6">
                  {Object.entries(cart).map(([id, qty]) => {
                    const ticket = tickets.find(t => t.id === id)!
                    return (
                      <div key={id} className="flex items-center justify-between p-4 bg-[rgba(255,255,255,.02)]">
                        <div className="flex-1">
                          <span className="text-[12px] font-semibold text-gold-2">{ticket.name}</span>
                          <span className="text-[11px] text-muted ml-2">{ticket.price === 0 ? 'Gratuit' : `${ticket.price} CAD / pièce`}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <button onClick={() => removeFromCart(id)} className="w-7 h-7 border border-[rgba(200,155,60,.15)] text-muted hover:border-gold hover:text-gold-2 flex items-center justify-center text-sm transition-colors">−</button>
                            <span className="text-[13px] text-white w-6 text-center font-medium">{qty}</span>
                            <button onClick={() => addToCart(id)} className="w-7 h-7 border border-[rgba(200,155,60,.15)] text-muted hover:border-gold hover:text-gold-2 flex items-center justify-center text-sm transition-colors">+</button>
                          </div>
                          <span className="text-[13px] text-gold-2 font-semibold w-20 text-right">{ticket.price * qty} CAD</span>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Promo code */}
                <div className="flex gap-2 mb-6">
                  <input type="text" value={promoCode} onChange={e => setPromoCode(e.target.value)} placeholder="Code promo" className="flex-1 bg-[rgba(255,255,255,.04)] border border-[rgba(200,155,60,.13)] text-text px-4 py-2.5 text-sm outline-none focus:border-gold transition-colors" />
                  <button onClick={applyPromo} className="btn-outline !py-2.5 !px-5">Appliquer</button>
                </div>
                {appliedPromo && <p className="text-[12px] text-[#4ade80] mb-4">✓ {appliedPromo.label} appliqué</p>}

                {/* Totals */}
                <div className="border-t border-[rgba(200,155,60,.12)] pt-4 space-y-2">
                  <div className="flex justify-between text-[13px] text-muted"><span>Sous-total</span><span>{subtotal} CAD</span></div>
                  {discount > 0 && <div className="flex justify-between text-[13px] text-[#4ade80]"><span>Remise</span><span>-{discount} CAD</span></div>}
                  <div className="flex justify-between text-lg font-display font-bold text-gold-2 pt-3 border-t border-[rgba(200,155,60,.12)]"><span>Total</span><span>{total} CAD</span></div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button onClick={() => setStep('select')} className="btn-outline">← Retour</button>
                  <button onClick={() => setStep('payment')} className="btn-gold flex-1 justify-center">Passer au paiement →</button>
                </div>
              </>
            )}
          </div>
        )}

        {/* STEP 3 — Paiement */}
        {step === 'payment' && (
          <div className="max-w-[640px]">
            <h3 className="font-display text-[22px] font-bold text-white mb-6">Paiement sécurisé</h3>

            {/* Infos client */}
            <div className="bg-navy-2 border border-[rgba(200,155,60,.08)] p-6 mb-6">
              <h4 className="text-[11px] font-bold tracking-[2px] uppercase text-gold-2 mb-4">Vos informations</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input type="text" placeholder="Prénom *" required value={customerInfo.firstName} onChange={e => setCustomerInfo({...customerInfo, firstName: e.target.value})} className="bg-[rgba(255,255,255,.04)] border border-[rgba(200,155,60,.13)] text-text px-3.5 py-2.5 text-sm outline-none focus:border-gold transition-colors" />
                <input type="text" placeholder="Nom *" required value={customerInfo.lastName} onChange={e => setCustomerInfo({...customerInfo, lastName: e.target.value})} className="bg-[rgba(255,255,255,.04)] border border-[rgba(200,155,60,.13)] text-text px-3.5 py-2.5 text-sm outline-none focus:border-gold transition-colors" />
                <input type="email" placeholder="Courriel *" required value={customerInfo.email} onChange={e => setCustomerInfo({...customerInfo, email: e.target.value})} className="bg-[rgba(255,255,255,.04)] border border-[rgba(200,155,60,.13)] text-text px-3.5 py-2.5 text-sm outline-none focus:border-gold transition-colors md:col-span-2" />
                <input type="tel" placeholder="Téléphone (optionnel)" value={customerInfo.phone} onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})} className="bg-[rgba(255,255,255,.04)] border border-[rgba(200,155,60,.13)] text-text px-3.5 py-2.5 text-sm outline-none focus:border-gold transition-colors md:col-span-2" />
              </div>
            </div>

            {/* Méthodes de paiement */}
            <div className="mb-6">
              <h4 className="text-[11px] font-bold tracking-[2px] uppercase text-gold-2 mb-4">Mode de paiement</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[2px] bg-[rgba(200,155,60,.08)] border border-[rgba(200,155,60,.08)]">
                {[
                  { id: 'stripe', name: 'Stripe', icon: '💳', desc: 'Visa / Mastercard' },
                  { id: 'paypal', name: 'PayPal', icon: '🅿️', desc: 'Compte PayPal' },
                  { id: 'orange_money', name: 'Orange Money', icon: '🟠', desc: 'Mobile Money' },
                  { id: 'wave', name: 'Wave', icon: '🔵', desc: 'Mobile Money' },
                ].map(method => (
                  <button key={method.id} onClick={() => setSelectedPayment(method.id)} className={`flex items-center gap-3 p-4 transition-all text-left cursor-pointer ${
                    selectedPayment === method.id
                      ? 'bg-[rgba(200,155,60,.08)] border border-gold'
                      : 'bg-navy-2 border border-transparent hover:bg-[rgba(200,155,60,.04)]'
                  }`}>
                    <span className="text-xl">{method.icon}</span>
                    <div className="flex-1">
                      <span className="block text-[12px] font-semibold text-text">{method.name}</span>
                      <span className="text-[10px] text-muted">{method.desc}</span>
                    </div>
                    {selectedPayment === method.id && <span className="text-gold text-sm">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Récapitulatif */}
            <div className="bg-navy-2 border border-[rgba(200,155,60,.08)] p-5 mb-6">
              <h4 className="text-[11px] font-bold tracking-[2px] uppercase text-gold-2 mb-3">Récapitulatif</h4>
              <div className="space-y-1.5">
                {Object.entries(cart).map(([id, qty]) => {
                  const ticket = tickets.find(t => t.id === id)!
                  return <div key={id} className="flex justify-between text-[12px] text-text"><span>{qty}x {ticket.name}</span><span>{ticket.price * qty} CAD</span></div>
                })}
                {appliedPromo && <div className="flex justify-between text-[12px] text-[#4ade80]"><span>Remise</span><span>-{discount} CAD</span></div>}
              </div>
              <div className="flex justify-between text-lg font-display font-bold text-gold-2 mt-3 pt-3 border-t border-[rgba(200,155,60,.12)]"><span>Total</span><span>{total} CAD</span></div>
            </div>

            <p className="text-[11px] text-muted mb-4 flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold flex-shrink-0"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Paiement 100% sécurisé. Billets envoyés par courriel avec QR code.
            </p>

            <div className="flex gap-3">
              <button onClick={() => setStep('cart')} className="btn-outline">← Retour</button>
              <button
                className="btn-gold flex-1 justify-center disabled:opacity-50"
                disabled={paying || !customerInfo.firstName || !customerInfo.lastName || !customerInfo.email}
                onClick={async () => {
                  setPaying(true)
                  try {
                    const items = Object.entries(cart).map(([id, qty]) => ({ slug: id, quantity: qty }))
                    const res = await fetch('/api/checkout', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        email: customerInfo.email,
                        firstName: customerInfo.firstName,
                        lastName: customerInfo.lastName,
                        phone: customerInfo.phone || undefined,
                        items,
                        promoCode: promoCode || undefined,
                        paymentMethod: selectedPayment,
                      }),
                    })
                    const data = await res.json()
                    if (data.paymentUrl) {
                      window.location.href = data.paymentUrl
                    } else if (data.orderId) {
                      router.push(`/billetterie/confirmation?order=${data.orderId}`)
                    } else {
                      alert(data.error || 'Erreur lors de la création de la commande')
                    }
                  } catch {
                    alert('Erreur de connexion. Veuillez réessayer.')
                  } finally {
                    setPaying(false)
                  }
                }}
              >
                {paying ? 'Redirection...' : `Payer ${total} CAD →`}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
