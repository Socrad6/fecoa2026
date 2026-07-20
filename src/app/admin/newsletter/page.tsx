import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function AdminNewsletter() {
  const user = await getCurrentUser()
  if (!user || user.role !== 'admin') redirect('/admin/login')

  const subscribers = await prisma.newsletter.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-[24px] font-bold" style={{ color: 'var(--color-text)' }}>Newsletter ({subscribers.length})</h2>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ background: 'var(--color-bg-2)', border: '1px solid var(--color-border)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b" style={{ borderColor: 'var(--color-border)' }}>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--color-muted)' }}>Courriel</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--color-muted)' }}>Confirmé</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--color-muted)' }}>Inscrit le</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map(sub => (
                <tr key={sub.id} className="border-b" style={{ borderColor: 'var(--color-border-2)' }}>
                  <td className="px-4 py-3">{sub.email}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[9px] font-bold tracking-[1px] uppercase px-2 py-0.5 rounded-full ${sub.confirmed ? 'bg-[rgba(26,122,60,.15)] text-[#4ade80]' : 'bg-[rgba(200,155,60,.14)] text-gold-2'}`}>
                      {sub.confirmed ? 'Oui' : 'Non'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[11px]" style={{ color: 'var(--color-muted)' }}>
                    {new Date(sub.createdAt).toLocaleDateString('fr-CA')}
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
