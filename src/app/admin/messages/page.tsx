import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function AdminMessages() {
  const user = await getCurrentUser()
  if (!user || user.role !== 'admin') redirect('/admin/login')

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-[24px] font-bold" style={{ color: 'var(--color-text)' }}>
          Messages ({messages.filter(m => !m.read).length} non lus)
        </h2>
      </div>

      <div className="space-y-3">
        {messages.map(msg => (
          <div key={msg.id} className="rounded-xl p-5" style={{ background: 'var(--color-bg-2)', border: `1px solid ${msg.read ? 'var(--color-border-2)' : 'rgba(200,155,60,.15)'}` }}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="font-semibold text-[14px]" style={{ color: 'var(--color-text)' }}>{msg.name}</span>
                <span className="text-[12px] ml-2" style={{ color: 'var(--color-muted)' }}>{msg.email}</span>
                {!msg.read && <span className="ml-2 text-[9px] font-bold tracking-[1px] uppercase px-2 py-0.5 rounded-full bg-[rgba(200,155,60,.12)] text-gold-2">Nouveau</span>}
              </div>
              <span className="text-[11px]" style={{ color: 'var(--color-muted)' }}>
                {new Date(msg.createdAt).toLocaleDateString('fr-CA')}
              </span>
            </div>
            {msg.subject && <p className="text-[12px] font-semibold mb-1" style={{ color: 'var(--color-text)' }}>{msg.subject}</p>}
            <p className="text-[13px] leading-relaxed" style={{ color: 'var(--color-text-2)' }}>{msg.message}</p>
          </div>
        ))}
        {messages.length === 0 && (
          <p className="text-center py-12" style={{ color: 'var(--color-muted)' }}>Aucun message</p>
        )}
      </div>
    </div>
  )
}
