import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function AdminUsers() {
  const user = await getCurrentUser()
  if (!user || user.role !== 'admin') redirect('/admin/login')

  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, email: true, firstName: true, lastName: true, role: true, createdAt: true, _count: { select: { orders: true } } },
  })

  const roleColors: Record<string, string> = {
    admin: '#C89B3C', exhibitor: '#1A5276', sponsor: '#1A7A3C', press: '#7D3C98', visitor: '#6b7280',
  }

  return (
    <div>
      <h2 className="font-display text-[24px] font-bold mb-6" style={{ color: 'var(--color-text)' }}>Utilisateurs ({users.length})</h2>

      <div className="rounded-xl overflow-hidden" style={{ background: 'var(--color-bg-2)', border: '1px solid var(--color-border)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b" style={{ borderColor: 'var(--color-border)' }}>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--color-muted)' }}>Nom</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--color-muted)' }}>Courriel</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--color-muted)' }}>Rôle</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--color-muted)' }}>Commandes</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--color-muted)' }}>Inscrit le</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-b" style={{ borderColor: 'var(--color-border-2)' }}>
                  <td className="px-4 py-3 font-medium">{u.firstName} {u.lastName}</td>
                  <td className="px-4 py-3">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className="text-[9px] font-bold tracking-[1px] uppercase px-2 py-0.5 rounded-full" style={{ background: `${roleColors[u.role] || '#6b7280'}20`, color: roleColors[u.role] || '#6b7280' }}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">{u._count.orders}</td>
                  <td className="px-4 py-3 text-[11px]" style={{ color: 'var(--color-muted)' }}>
                    {new Date(u.createdAt).toLocaleDateString('fr-CA')}
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
