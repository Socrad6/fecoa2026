import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const user = await getCurrentUser()
  if (!user || user.role !== 'admin') redirect('/admin/login')

  const [orderCount, paidRevenue, exhibitorCount, sponsorCount, newsletterCount, messageCount, recentOrders] = await Promise.all([
    prisma.order.count(),
    prisma.order.aggregate({ where: { status: 'paid' }, _sum: { total: true } }),
    prisma.exhibitor.count(),
    prisma.sponsor.count(),
    prisma.newsletter.count(),
    prisma.contactMessage.count({ where: { read: false } }),
    prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: { items: { include: { ticketType: true } } },
    }),
  ])

  const totalRevenue = (paidRevenue._sum.total || 0) / 100

  const stats = [
    { label: 'Commandes', value: orderCount, icon: '🛒', color: '#C89B3C' },
    { label: 'Revenus', value: `${totalRevenue.toFixed(0)} $`, icon: '💰', color: '#4ade80' },
    { label: 'Exposants', value: exhibitorCount, icon: '🏢', color: '#1A5276' },
    { label: 'Sponsors', value: sponsorCount, icon: '🤝', color: '#1A7A3C' },
    { label: 'Newsletter', value: newsletterCount, icon: '📧', color: '#7D3C98' },
    { label: 'Messages non lus', value: messageCount, icon: '💬', color: '#C0392B' },
  ]

  return (
    <div>
      <h2 className="font-display text-[28px] font-bold mb-6" style={{ color: 'var(--color-text)' }}>Tableau de bord</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {stats.map(s => (
          <div key={s.label} className="p-4 rounded-xl" style={{ background: 'var(--color-bg-2)', border: '1px solid var(--color-border)' }}>
            <span className="text-xl mb-2 block">{s.icon}</span>
            <span className="block font-display text-[24px] font-bold" style={{ color: s.color }}>{s.value}</span>
            <span className="block text-[10px] font-bold tracking-[1px] uppercase mt-1" style={{ color: 'var(--color-muted)' }}>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="rounded-xl overflow-hidden" style={{ background: 'var(--color-bg-2)', border: '1px solid var(--color-border)' }}>
        <div className="p-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <h3 className="text-[13px] font-bold" style={{ color: 'var(--color-text)' }}>Dernières commandes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b" style={{ borderColor: 'var(--color-border)' }}>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--color-muted)' }}>#Commande</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--color-muted)' }}>Client</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--color-muted)' }}>Total</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--color-muted)' }}>Paiement</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--color-muted)' }}>Statut</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--color-muted)' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id} className="border-b hover:bg-[rgba(200,155,60,.03)] transition-colors" style={{ borderColor: 'var(--color-border-2)' }}>
                  <td className="px-4 py-3 font-mono text-[11px]">{order.id.slice(-8).toUpperCase()}</td>
                  <td className="px-4 py-3">{order.firstName} {order.lastName}</td>
                  <td className="px-4 py-3 font-semibold text-gold-2">{(order.total / 100).toFixed(2)} CAD</td>
                  <td className="px-4 py-3 capitalize">{order.paymentMethod || '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[9px] font-bold tracking-[1px] uppercase px-2 py-0.5 rounded-full ${order.status === 'paid' ? 'bg-[rgba(26,122,60,.15)] text-[#4ade80]' : order.status === 'pending' ? 'bg-[rgba(200,155,60,.14)] text-gold-2' : 'bg-[rgba(192,57,43,.15)] text-red-400'}`}>
                      {order.status === 'paid' ? 'Payée' : order.status === 'pending' ? 'En attente' : order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[11px]" style={{ color: 'var(--color-muted)' }}>
                    {new Date(order.createdAt).toLocaleDateString('fr-CA')}
                  </td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center" style={{ color: 'var(--color-muted)' }}>Aucune commande</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
