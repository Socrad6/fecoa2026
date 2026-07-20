import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function AdminSponsors() {
  const user = await getCurrentUser()
  if (!user || user.role !== 'admin') redirect('/admin/login')

  const sponsors = await prisma.sponsor.findMany({
    orderBy: { createdAt: 'desc' },
    include: { user: { select: { email: true, firstName: true, lastName: true } } },
  })

  return (
    <div>
      <h2 className="font-display text-[24px] font-bold mb-6" style={{ color: 'var(--color-text)' }}>Sponsors ({sponsors.length})</h2>

      <div className="rounded-xl overflow-hidden" style={{ background: 'var(--color-bg-2)', border: '1px solid var(--color-border)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b" style={{ borderColor: 'var(--color-border)' }}>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--color-muted)' }}>Entreprise</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--color-muted)' }}>Contact</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--color-muted)' }}>Package</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--color-muted)' }}>Montant</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--color-muted)' }}>Statut</th>
              </tr>
            </thead>
            <tbody>
              {sponsors.map(sp => (
                <tr key={sp.id} className="border-b" style={{ borderColor: 'var(--color-border-2)' }}>
                  <td className="px-4 py-3 font-medium">{sp.companyName}</td>
                  <td className="px-4 py-3 text-[11px]">{sp.user.firstName} {sp.user.lastName}<br /><span style={{ color: 'var(--color-muted)' }}>{sp.user.email}</span></td>
                  <td className="px-4 py-3 capitalize">{sp.packageLevel}</td>
                  <td className="px-4 py-3 font-semibold text-gold-2">{(sp.amount / 100).toFixed(0)} CAD</td>
                  <td className="px-4 py-3">
                    <span className={`text-[9px] font-bold tracking-[1px] uppercase px-2 py-0.5 rounded-full ${sp.status === 'confirmed' ? 'bg-[rgba(26,122,60,.15)] text-[#4ade80]' : sp.status === 'pending' ? 'bg-[rgba(200,155,60,.14)] text-gold-2' : 'bg-[rgba(192,57,43,.15)] text-red-400'}`}>
                      {sp.status}
                    </span>
                  </td>
                </tr>
              ))}
              {sponsors.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center" style={{ color: 'var(--color-muted)' }}>Aucun sponsor</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
