'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function TicketConfirmation() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order')
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useState(() => {
    if (!orderId) {
      setError('Aucune commande trouvée')
      setLoading(false)
      return
    }

    fetch(`/api/tickets?order=${orderId}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) setError(data.error)
        else setOrder(data)
        setLoading(false)
      })
      .catch(() => {
        setError('Erreur de chargement')
        setLoading(false)
      })
  })

  return (
    <section className="py-[clamp(70px,9vh,128px)] px-[clamp(16px,5vw,80px)] pt-32 min-h-screen">
      <div className="max-w-[600px] mx-auto text-center">
        {loading ? (
          <div className="py-20">
            <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted">Chargement de votre commande...</p>
          </div>
        ) : error ? (
          <div className="py-20">
            <div className="w-16 h-16 rounded-full border-2 border-[#C0392B] flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/></svg>
            </div>
            <h2 className="font-display text-3xl font-bold text-white mb-3">Erreur</h2>
            <p className="text-muted mb-6">{error}</p>
            <Link href="/billetterie" className="btn-gold">Retour à la billetterie</Link>
          </div>
        ) : order ? (
          <>
            <div className="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center mx-auto mb-6">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C89B3C" strokeWidth="2"><path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h2 className="font-display text-3xl font-bold text-white mb-2">Merci pour votre achat !</h2>
            <p className="text-muted mb-8">Vos billets ont été envoyés à <strong className="text-gold-2">{order.email}</strong></p>

            <div className="bg-navy-2 border border-[rgba(200,155,60,.12)] p-6 mb-6 text-left">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-bold tracking-[3px] uppercase text-gold-2">Commande #{order.orderId?.slice(-8).toUpperCase()}</span>
                <span className="text-[10px] font-bold tracking-[2px] uppercase px-2 py-0.5 bg-[rgba(26,122,60,.15)] text-[#4ade80] rounded-full">
                  {order.status === 'paid' ? 'Payée' : 'En attente'}
                </span>
              </div>

              {order.items?.map((item: any, i: number) => (
                <div key={i} className="flex justify-between py-2 border-b border-[rgba(200,155,60,.06)] text-sm">
                  <span className="text-text">{item.quantity}x {item.name}</span>
                  <span className="text-gold-2 font-semibold">{item.lineTotal / 100} CAD</span>
                </div>
              ))}

              {order.discount > 0 && (
                <div className="flex justify-between py-2 text-sm">
                  <span className="text-[#4ade80]">Remise ({order.promoCode})</span>
                  <span className="text-[#4ade80]">-{order.discount / 100} CAD</span>
                </div>
              )}

              <div className="flex justify-between pt-3 mt-2 border-t border-[rgba(200,155,60,.12)]">
                <span className="font-display text-lg font-bold text-white">Total</span>
                <span className="font-display text-lg font-bold text-gold-2">{order.total / 100} CAD</span>
              </div>
            </div>

            {order.tickets?.length > 0 && (
              <div className="bg-navy-2 border border-[rgba(200,155,60,.12)] p-6 mb-6 text-left">
                <h3 className="text-sm font-semibold text-gold-2 mb-3">Vos billets</h3>
                {order.tickets.map((ticket: any) => (
                  <div key={ticket.id} className="flex items-center justify-between py-2 border-b border-[rgba(200,155,60,.06)]">
                    <div>
                      <span className="text-sm text-text">{ticket.type}</span>
                      <span className="text-[10px] text-muted ml-2">QR: {ticket.qrCode?.slice(0, 8)}...</span>
                    </div>
                    <span className={`text-[9px] font-bold tracking-[1px] uppercase px-2 py-0.5 rounded-full ${ticket.status === 'valid' ? 'bg-[rgba(26,122,60,.15)] text-[#4ade80]' : 'bg-[rgba(200,155,60,.14)] text-gold-2'}`}>
                      {ticket.status === 'valid' ? 'Valide' : ticket.status}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/" className="btn-outline">Retour à l&apos;accueil</Link>
              <Link href="/billetterie" className="btn-gold">Acheter d&apos;autres billets</Link>
            </div>
          </>
        ) : null}
      </div>
    </section>
  )
}
