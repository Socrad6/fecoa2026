import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function AdminExposants() {
  const user = await getCurrentUser()
  if (!user || user.role !== 'admin') redirect('/admin/login')

  const exhibitors = await prisma.exhibitor.findMany({
    orderBy: { createdAt: 'desc' },
    include: { user: { select: { email: true, firstName: true, lastName: true } } },
  })

  return (
    <div>
      <h2 className="font-display text-[24px] font-bold mb-6" style={{ color: 'var(--color-text)' }}>Exposants ({exhibitors.length})</h2>

      <div className="rounded-xl overflow-hidden" style={{ background: 'var(--color-bg-2)', border: '1px solid var(--color-border)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b" style={{ borderColor: 'var(--color-border)' }}>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--color-muted)' }}>Entreprise</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--color-muted)' }}>Secteur</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--color-muted)' }}>Contact</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--color-muted)' }}>Stand</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--color-muted)' }}>Statut</th>
              </tr>
            </thead>
            <tbody>
              {exhibitors.map(ex => (
                <tr key={ex.id} className="border-b" style={{ borderColor: 'var(--color-border-2)' }}>
                  <td className="px-4 py-3 font-medium">{ex.companyName}</td>
                  <td className="px-4 py-3">{ex.sector}</td>
                  <td className="px-4 py-3 text-[11px]">{ex.user.firstName} {ex.user.lastName}<br /><span style={{ color: 'var(--color-muted)' }}>{ex.user.email}</span></td>
                  <td className="px-4 py-3 capitalize">{ex.standTier}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[9px] font-bold tracking-[1px] uppercase px-2 py-0.5 rounded-full ${ex.status === 'confirmed' ? 'bg-[rgba(26,122,60,.15)] text-[#4ade80]' : ex.status === 'pending' ? 'bg-[rgba(200,155,60,.14)] text-gold-2' : 'bg-[rgba(192,57,43,.15)] text-red-400'}`}>
                      {ex.status}
                    </span>
                  </td>
                </tr>
              ))}
              {exhibitors.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center" style={{ color: 'var(--color-muted)' }}>Aucun exposant</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
