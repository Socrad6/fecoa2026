import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente — FÉCOA 2026',
  description: 'Conditions Générales de Vente des billets pour la FÉCOA 2026.',
}

export default function CGV() {
  return (
    <section className="py-[clamp(70px,9vh,128px)] px-[clamp(16px,5vw,80px)] pt-32 min-h-screen page-enter" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-[800px] mx-auto">
        <h1 className="font-display text-[clamp(32px,5vw,48px)] font-bold mb-8" style={{ color: 'var(--color-text)' }}>
          Conditions Générales de <span className="text-gold-2">Vente</span>
        </h1>
        <p className="text-[13px] mb-8" style={{ color: 'var(--color-muted)' }}>Dernière mise à jour : 20 juillet 2026</p>

        <div className="space-y-8 text-[14px] leading-relaxed" style={{ color: 'var(--color-text-2)' }}>
          <div>
            <h2 className="font-display text-[22px] font-bold mb-3" style={{ color: 'var(--color-text)' }}>Article 1 — Objet</h2>
            <p>Les présentes CGV régissent la vente de billets d&apos;accès à la Foire Économique et Culturelle Ouest-Africaine 2026 (« l&apos;Événement »), organisée du 17 au 20 décembre 2026 à Montréal, Québec, Canada.</p>
          </div>

          <div>
            <h2 className="font-display text-[22px] font-bold mb-3" style={{ color: 'var(--color-text)' }}>Article 2 — Billets</h2>
            <p>Les billets sont vendus exclusivement en ligne via le site fecoa2026.ca. Chaque billet est nominatif et associé à un code QR unique. Un billet ne peut être utilisé qu&apos;une seule fois.</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Journée :</strong> accès à une journée au choix (17, 18, 19 ou 20 décembre)</li>
              <li><strong>Forfait 4 jours :</strong> accès complet à toutes les journées</li>
              <li><strong>VIP :</strong> accès premium avec espaces VIP et avantages exclusifs</li>
              <li><strong>Enfant (&lt;12 ans) :</strong> tarif réduit</li>
              <li><strong>Moins de 5 ans :</strong> entrée gratuite (pas de réservation requise)</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-[22px] font-bold mb-3" style={{ color: 'var(--color-text)' }}>Article 3 — Prix et paiement</h2>
            <p>Les prix sont indiqués en dollars canadiens (CAD), taxes comprises. Les modes de paiement acceptés sont : carte de crédit (Stripe), PayPal, Orange Money et Wave. Le paiement doit être intégralement réglé lors de la commande.</p>
          </div>

          <div>
            <h2 className="font-display text-[22px] font-bold mb-3" style={{ color: 'var(--color-text)' }}>Article 4 — Annulation et remboursement</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Annulation plus de 30 jours avant l&apos;événement : remboursement intégral</li>
              <li>Annulation entre 15 et 30 jours avant l&apos;événement : remboursement de 50%</li>
              <li>Annulation moins de 15 jours avant l&apos;événement : aucun remboursement</li>
              <li>Les demandes d&apos;annulation doivent être envoyées à <span className="text-gold-2">billetterie@fecoa2026.ca</span></li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-[22px] font-bold mb-3" style={{ color: 'var(--color-text)' }}>Article 5 — Responsabilité</h2>
            <p>L&apos;organisateur ne saurait être tenu responsable des annulations dus à des circonstances indépendantes de sa volonté (force majeure, intempéries, décisions gouvernementales). En cas d&apos;annulation de l&apos;événement, un remboursement intégral sera effectué.</p>
          </div>

          <div>
            <h2 className="font-display text-[22px] font-bold mb-3" style={{ color: 'var(--color-text)' }}>Article 6 — Code de conduite</h2>
            <p>Les participants s&apos;engagent à respecter le code de conduite de l&apos;événement. L&apos;organisateur se réserve le droit d&apos;expulser tout participant dont le comportement serait jugé inapproprié, sans remboursement.</p>
          </div>

          <div>
            <h2 className="font-display text-[22px] font-bold mb-3" style={{ color: 'var(--color-text)' }}>Article 7 — Droit applicable</h2>
            <p>Les présentes CGV sont régies par les lois de la Province de Québec, Canada. Tout litige sera soumis aux tribunaux compétents de Montréal.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
