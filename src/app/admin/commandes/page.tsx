import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function AdminCommandes() {
  const user = await getCurrentUser()
  if (!user || user.role !== 'admin') redirect('/admin/login')

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { items: { include: { ticketType: true } }, tickets: true },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-[24px] font-bold" style={{ color: 'var(--color-text)' }}>Commandes ({orders.length})</h2>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ background: 'var(--color-bg-2)', border: '1px solid var(--color-border)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b" style={{ borderColor: 'var(--color-border)' }}>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--color-muted)' }}>#</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--color-muted)' }}>Client</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--color-muted)' }}>Billets</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--color-muted)' }}>Total</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--color-muted)' }}>Paiement</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--color-muted)' }}>Statut</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--color-muted)' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-b hover:bg-[rgba(200,155,60,.03)] transition-colors" style={{ borderColor: 'var(--color-border-2)' }}>
                  <td className="px-4 py-3 font-mono text-[11px]">{order.id.slice(-8).toUpperCase()}</td>
                  <td className="px-4 py-3">
                    <div>{order.firstName} {order.lastName}</div>
                    <div className="text-[11px]" style={{ color: 'var(--color-muted)' }}>{order.email}</div>
                  </td>
                  <td className="px-4 py-3">{order.tickets.length}</td>
                  <td className="px-4 py-3 font-semibold text-gold-2">{(order.total / 100).toFixed(2)} CAD</td>
                  <td className="px-4 py-3 capitalize">{order.paymentMethod || '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[9px] font-bold tracking-[1px] uppercase px-2 py-0.5 rounded-full ${order.status === 'paid' ? 'bg-[rgba(26,122,60,.15)] text-[#4ade80]' : order.status === 'pending' ? 'bg-[rgba(200,155,60,.14)] text-gold-2' : 'bg-[rgba(192,57,43,.15)] text-red-400'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[11px]" style={{ color: 'var(--color-muted)' }}>
                    {new Date(order.createdAt).toLocaleDateString('fr-CA')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
