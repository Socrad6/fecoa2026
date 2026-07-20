'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface OrderData {
  orderId: string; email: string; status: string; total: number; discount: number; promoCode: string | null
  items: { name: string; quantity: number; lineTotal: number }[]
  tickets: { id: string; type: string; qrCode: string; status: string }[]
}

export default function TicketConfirmation() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order')
  const [order, setOrder] = useState<OrderData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!orderId) { setError('Aucune commande trouvée'); setLoading(false); return }
    fetch(`/api/tickets?order=${orderId}`)
      .then(r => r.json())
      .then(data => { if (data.error) setError(data.error); else setOrder(data); setLoading(false) })
      .catch(() => { setError('Erreur de chargement'); setLoading(false) })
  }, [orderId])

  return (
    <section className="py-[clamp(70px,9vh,128px)] px-[clamp(16px,5vw,80px)] pt-32 min-h-screen page-enter" aria-labelledby="confirm-title">
      <div className="max-w-[600px] mx-auto text-center">
        <h1 id="confirm-title" className="sr-only">Confirmation de commande</h1>
        {loading ? (
          <div className="py-20">
            <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p style={{ color: 'var(--color-muted)' }}>Chargement de votre commande...</p>
          </div>
        ) : error ? (
          <div className="py-20 border rounded-xl" style={{ borderColor: 'var(--color-border)' }}>
            <div className="w-16 h-16 rounded-full border-2 border-[#C0392B] flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="2" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" /></svg>
            </div>
            <h2 className="font-display text-[26px] font-bold mb-3" style={{ color: 'var(--color-text)' }}>Erreur</h2>
            <p className="mb-6 text-[14px]" style={{ color: 'var(--color-muted)' }}>{error}</p>
            <Link href="/billetterie" className="btn-gold">Retour à la billetterie</Link>
          </div>
        ) : order ? (
          <>
            <div className="mb-8">
              <div className="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center mx-auto mb-5">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C89B3C" strokeWidth="2" aria-hidden="true"><path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <h2 className="font-display text-[28px] font-bold mb-2" style={{ color: 'var(--color-text)' }}>Merci pour votre achat !</h2>
              <p className="text-[14px]" style={{ color: 'var(--color-muted)' }}>
                Vos billets ont été envoyés à<br />
                <strong className="text-gold-2">{order.email}</strong>
              </p>
            </div>

            <div className="border rounded-xl p-6 mb-5 text-left" style={{ background: 'var(--color-bg-2)', borderColor: 'var(--color-border)' }}>
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-bold tracking-[3px] uppercase text-gold-2">Commande #{order.orderId?.slice(-8).toUpperCase()}</span>
                <span className={`text-[9px] font-bold tracking-[2px] uppercase px-2.5 py-0.5 rounded-full ${order.status === 'paid' ? 'bg-[rgba(26,122,60,.15)] text-[#4ade80]' : 'bg-[rgba(200,155,60,.14)] text-gold-2'}`}>
                  {order.status === 'paid' ? 'Payée' : 'En attente'}
                </span>
              </div>
              <div className="divide-y" style={{ borderColor: 'var(--color-border-2)' }}>
                {order.items?.map((item, i) => (
                  <div key={i} className="flex justify-between py-2.5 text-[13px]" style={{ color: 'var(--color-text)' }}>
                    <span>{item.quantity}x {item.name}</span>
                    <span className="text-gold-2 font-semibold">{(item.lineTotal / 100).toFixed(2)} CAD</span>
                  </div>
                ))}
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between py-2 text-[13px] border-t" style={{ borderColor: 'var(--color-border-2)' }}>
                  <span className="text-[#4ade80]">Remise ({order.promoCode})</span>
                  <span className="text-[#4ade80]">-{(order.discount / 100).toFixed(2)} CAD</span>
                </div>
              )}
              <div className="flex justify-between pt-3 mt-2 border-t" style={{ borderColor: 'var(--color-border)' }}>
                <span className="font-display text-lg font-bold" style={{ color: 'var(--color-text)' }}>Total</span>
                <span className="font-display text-lg font-bold text-gold-2">{(order.total / 100).toFixed(2)} CAD</span>
              </div>
            </div>

            {order.tickets?.length > 0 && (
              <div className="border rounded-xl p-6 mb-6 text-left" style={{ background: 'var(--color-bg-2)', borderColor: 'var(--color-border)' }}>
                <h2 className="text-[11px] font-bold tracking-[2px] uppercase text-gold-2 mb-4">Vos billets</h2>
                <div className="space-y-4">
                  {order.tickets.map((ticket, i) => (
                    <div key={ticket.id} className="p-4 rounded-lg border text-center" style={{ background: 'rgba(255,255,255,.02)', borderColor: 'var(--color-border-2)' }}>
                      <p className="text-[10px] font-bold tracking-[2px] uppercase mb-1" style={{ color: 'var(--color-muted)' }}>Billet {i + 1} sur {order.tickets.length}</p>
                      <p className="text-[14px] font-semibold mb-3" style={{ color: 'var(--color-text)' }}>{ticket.type}</p>
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`${typeof window !== 'undefined' ? window.location.origin : ''}/api/verify?qr=${ticket.qrCode}`)}&bgcolor=ffffff&color=061524`}
                        alt={`QR Code billet ${i + 1}`}
                        width={180}
                        height={180}
                        className="mx-auto rounded-lg mb-2"
                        style={{ background: '#fff', padding: '8px' }}
                      />
                      <p className="text-[9px] font-mono" style={{ color: 'var(--color-muted)' }}>{ticket.qrCode}</p>
                      <span className={`inline-block mt-2 text-[9px] font-bold tracking-[1px] uppercase px-2.5 py-0.5 rounded-full ${ticket.status === 'valid' ? 'bg-[rgba(26,122,60,.15)] text-[#4ade80]' : 'bg-[rgba(200,155,60,.14)] text-gold-2'}`}>
                        {ticket.status === 'valid' ? 'Valide' : ticket.status}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] mt-4 text-center" style={{ color: 'var(--color-muted)' }}>
                  Présentez ces billets (imprimés ou sur mobile) à l&apos;entrée de l&apos;événement.
                </p>
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
