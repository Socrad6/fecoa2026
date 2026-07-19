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
    description: 'L\'expérience ultime — accès complet VIP',
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
  { label: 'Early Bird', discount: 15, desc: 'Avant le 1er Novembre 2026' },
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

  return (
    <section className="py-[clamp(70px,9vh,128px)] px-[clamp(16px,5vw,80px)] pt-32">
      <div className="max-w-[1400px] mx-auto">
        <span className="eyebrow">Billetterie</span>
        <h2 className="sec-title">Achetez vos <em>billets</em></h2>
        <p className="text-[clamp(13px,1.4vw,15px)] text-muted max-w-[520px] leading-[1.8] mb-6">
          Choisissez votre formule et réservez votre place pour la FÉCOA 2026.
        </p>

        {/* Promo badges */}
        <div className="flex gap-3 flex-wrap mb-12">
          {promos.map(p => (
            <div key={p.label} className="flex items-center gap-2.5 px-4 py-2 border border-[rgba(200,155,60,.12)] bg-[rgba(200,155,60,.04)]">
              <span className="text-[9px] font-bold tracking-[1px] uppercase px-2 py-0.5 bg-gold text-navy">{p.label}</span>
              <span className="text-[13px] text-text"><strong className="text-gold-2">-{p.discount}%</strong> — {p.desc}</span>
            </div>
          ))}
        </div>

        {/* Step indicator */}
        <div className="flex gap-4 mb-12">
          {[
            { key: 'select', label: '1. Sélection' },
            { key: 'cart', label: '2. Panier' },
            { key: 'payment', label: '3. Paiement' },
          ].map(s => (
            <button
              key={s.key}
              onClick={() => { if (s.key === 'select' || (s.key === 'cart' && totalItems > 0) || (s.key === 'payment' && totalItems > 0)) setStep(s.key as typeof step) }}
              className={`px-4 py-2 text-[11px] font-semibold tracking-[2px] uppercase border transition-all ${step === s.key ? 'bg-gold text-navy border-gold' : 'bg-transparent text-muted border-[rgba(200,155,60,.15)] hover:border-gold hover:text-gold-2'}`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {step === 'select' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[2px] bg-[rgba(200,155,60,.12)] border border-[rgba(200,155,60,.12)]">
            {tickets.map(ticket => (
              <div key={ticket.id} className={`bg-navy-2 p-8 relative group ${ticket.popular ? 'ring-1 ring-gold/30' : ''}`}>
                {ticket.popular && (
                  <span className="absolute top-3 right-3 text-[9px] font-bold tracking-[1.5px] uppercase px-2.5 py-0.5 text-navy" style={{ background: ticket.color }}>
                    Populaire
                  </span>
                )}
                <div className="text-[9px] font-bold tracking-[3px] uppercase mb-2.5" style={{ color: ticket.color }}>{ticket.name}</div>
                <div className="font-display text-[clamp(28px,3vw,42px)] font-bold text-white leading-none mb-1">
                  {ticket.price === 0 ? 'Gratuit' : <>{ticket.price} <small className="text-[13px] text-muted font-normal">CAD</small></>}
                </div>
                <p className="text-[12px] text-muted mb-4 pb-4 border-b border-[rgba(200,155,60,.12)]">{ticket.description}</p>
                <ul className="mb-6">
                  {ticket.features.map(f => (
                    <li key={f} className="text-[12px] text-text py-1 flex gap-2.5 items-center">
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
        )}

        {step === 'cart' && (
          <div className="max-w-[700px]">
            <h3 className="font-display text-2xl font-bold text-white mb-6">Votre panier</h3>
            {totalItems === 0 ? (
              <p className="text-muted">Votre panier est vide. <button onClick={() => setStep('select')} className="text-gold-2 underline">Retour à la sélection</button></p>
            ) : (
              <>
                <div className="space-y-3 mb-8">
                  {Object.entries(cart).map(([id, qty]) => {
                    const ticket = tickets.find(t => t.id === id)!
                    return (
                      <div key={id} className="flex items-center justify-between p-4 bg-navy-2 border border-[rgba(200,155,60,.08)]">
                        <div>
                          <span className="text-xs font-semibold text-gold-2">{ticket.name}</span>
                          <span className="text-[13px] text-muted ml-3">{ticket.price === 0 ? 'Gratuit' : `${ticket.price} CAD`}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button onClick={() => removeFromCart(id)} className="w-7 h-7 border border-[rgba(200,155,60,.2)] text-muted hover:border-gold hover:text-gold-2 flex items-center justify-center text-sm transition-colors">−</button>
                          <span className="text-sm text-white w-6 text-center">{qty}</span>
                          <button onClick={() => addToCart(id)} className="w-7 h-7 border border-[rgba(200,155,60,.2)] text-muted hover:border-gold hover:text-gold-2 flex items-center justify-center text-sm transition-colors">+</button>
                          <span className="text-sm text-gold-2 font-semibold w-20 text-right">{ticket.price * qty} CAD</span>
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
                {appliedPromo && <p className="text-[13px] text-[#4ade80] mb-4">✓ {appliedPromo.label} appliqué</p>}

                {/* Totals */}
                <div className="border-t border-[rgba(200,155,60,.12)] pt-4 space-y-2">
                  <div className="flex justify-between text-[13px] text-muted"><span>Sous-total</span><span>{subtotal} CAD</span></div>
                  {discount > 0 && <div className="flex justify-between text-[13px] text-[#4ade80]"><span>Remise</span><span>-{discount} CAD</span></div>}
                  <div className="flex justify-between text-lg font-display font-bold text-gold-2 pt-2 border-t border-[rgba(200,155,60,.12)]"><span>Total</span><span>{total} CAD</span></div>
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
          <div className="max-w-[600px]">
            <h3 className="font-display text-2xl font-bold text-white mb-6">Paiement sécurisé</h3>

            {/* Infos client */}
            <div className="bg-navy-2 border border-[rgba(200,155,60,.08)] p-6 mb-6">
              <h4 className="text-sm font-semibold text-gold-2 mb-4">Vos informations</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input type="text" placeholder="Prénom *" required value={customerInfo.firstName} onChange={e => setCustomerInfo({...customerInfo, firstName: e.target.value})} className="bg-[rgba(255,255,255,.04)] border border-[rgba(200,155,60,.13)] text-text px-3.5 py-2.5 text-sm outline-none focus:border-gold transition-colors" />
                <input type="text" placeholder="Nom *" required value={customerInfo.lastName} onChange={e => setCustomerInfo({...customerInfo, lastName: e.target.value})} className="bg-[rgba(255,255,255,.04)] border border-[rgba(200,155,60,.13)] text-text px-3.5 py-2.5 text-sm outline-none focus:border-gold transition-colors" />
                <input type="email" placeholder="Courriel *" required value={customerInfo.email} onChange={e => setCustomerInfo({...customerInfo, email: e.target.value})} className="bg-[rgba(255,255,255,.04)] border border-[rgba(200,155,60,.13)] text-text px-3.5 py-2.5 text-sm outline-none focus:border-gold transition-colors md:col-span-2" />
                <input type="tel" placeholder="Téléphone (optionnel)" value={customerInfo.phone} onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})} className="bg-[rgba(255,255,255,.04)] border border-[rgba(200,155,60,.13)] text-text px-3.5 py-2.5 text-sm outline-none focus:border-gold transition-colors md:col-span-2" />
              </div>
            </div>

            {/* Méthodes de paiement */}
            <div className="space-y-3 mb-8">
              {[
                { id: 'stripe', name: 'Stripe (Visa / Mastercard)', icon: '💳', desc: 'Carte de crédit ou de débit' },
                { id: 'paypal', name: 'PayPal', icon: '🅿️', desc: 'Paiement via votre compte PayPal' },
                { id: 'orange_money', name: 'Orange Money', icon: '🟠', desc: 'Mobile Money Orange — Afrique de l\'Ouest' },
                { id: 'wave', name: 'Wave', icon: '🔵', desc: 'Mobile Money Wave — Afrique de l\'Ouest' },
              ].map(method => (
                <button key={method.id} onClick={() => setSelectedPayment(method.id)} className={`w-full flex items-center gap-4 p-4 bg-navy-2 border transition-all text-left cursor-pointer ${selectedPayment === method.id ? 'border-gold bg-[rgba(200,155,60,.05)]' : 'border-[rgba(200,155,60,.08)] hover:border-[rgba(200,155,60,.2)]'}`}>
                  <span className="text-2xl">{method.icon}</span>
                  <div className="flex-1">
                    <span className="block text-sm font-semibold text-text">{method.name}</span>
                    <span className="text-[11px] text-muted">{method.desc}</span>
                  </div>
                  {selectedPayment === method.id && <span className="text-gold text-lg">✓</span>}
                </button>
              ))}
            </div>

            <div className="bg-navy-2 border border-[rgba(200,155,60,.08)] p-6 mb-6">
              <h4 className="text-sm font-semibold text-gold-2 mb-3">Récapitulatif</h4>
              {Object.entries(cart).map(([id, qty]) => {
                const ticket = tickets.find(t => t.id === id)!
                return <div key={id} className="flex justify-between text-[13px] text-text py-1"><span>{qty}x {ticket.name}</span><span>{ticket.price * qty} CAD</span></div>
              })}
              {appliedPromo && <div className="flex justify-between text-[13px] text-[#4ade80] py-1"><span>Remise ({appliedPromo.label})</span><span>-{discount} CAD</span></div>}
              <div className="flex justify-between text-lg font-display font-bold text-gold-2 mt-3 pt-3 border-t border-[rgba(200,155,60,.12)]"><span>Total</span><span>{total} CAD</span></div>
            </div>

            <p className="text-[11px] text-muted mb-4">🔒 Paiement 100% sécurisé. Vos billets seront envoyés par courriel avec un QR code unique.</p>

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
                  } catch (err) {
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
