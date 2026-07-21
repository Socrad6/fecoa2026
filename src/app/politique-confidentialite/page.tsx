import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité — FÉCOA 2026',
  description: 'Politique de confidentialité de la Foire Économique et Culturelle Ouest-Africaine 2026.',
}

export default function PolitiqueConfidentialite() {
  return (
    <section className="py-[clamp(70px,9vh,128px)] px-[clamp(16px,5vw,80px)] pt-32 min-h-screen page-enter" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-[800px] mx-auto">
        <h1 className="font-display text-[clamp(32px,5vw,48px)] font-bold mb-8" style={{ color: 'var(--color-text)' }}>
          Politique de <span className="text-gold-2">confidentialité</span>
        </h1>
        <p className="text-[13px] mb-8" style={{ color: 'var(--color-muted)' }}>Dernière mise à jour : 20 juillet 2026</p>

        <div className="space-y-8 text-[14px] leading-relaxed" style={{ color: 'var(--color-text-2)' }}>
          <div>
            <h2 className="font-display text-[22px] font-bold mb-3" style={{ color: 'var(--color-text)' }}>1. Collecte des informations</h2>
            <p>Nous collectons les informations que vous nous fournissez directement lors de votre inscription à la newsletter, de l&apos;achat de billets, du formulaire de contact ou de l&apos;inscription en tant qu&apos;exposant/sponsor. Ces informations incluent :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Nom et prénom</li>
              <li>Adresse courriel</li>
              <li>Numéro de téléphone (optionnel)</li>
              <li>Informations de paiement (traitées par Stripe et PayPal, jamais stockées sur nos serveurs)</li>
              <li>Informations d&apos;entreprise (pour les exposants et sponsors)</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-[22px] font-bold mb-3" style={{ color: 'var(--color-text)' }}>2. Utilisation des informations</h2>
            <p>Vos informations sont utilisées exclusivement pour :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Traiter vos commandes et vous envoyer vos billets</li>
              <li>Vous envoyer des communications relatives à l&apos;événement FÉCOA 2026</li>
              <li>Répondre à vos demandes via le formulaire de contact</li>
              <li>Gérer les inscriptions des exposants, sponsors et accréditations presse</li>
              <li>Améliorer nos services et l&apos;expérience utilisateur</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-[22px] font-bold mb-3" style={{ color: 'var(--color-text)' }}>3. Partage des informations</h2>
            <p>Nous ne vendons ni ne louons vos informations personnelles à des tiers. Vos données peuvent être partagées uniquement avec :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Nos processeurs de paiement (Stripe, PayPal, Orange Money, Wave) pour traiter les transactions</li>
              <li>Vercel pour l&apos;hébergement de l&apos;application</li>
              <li>Resend pour l&apos;envoi d&apos; courriels transactionnels</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-[22px] font-bold mb-3" style={{ color: 'var(--color-text)' }}>4. Sécurité des données</h2>
            <p>Nous prenons des mesures techniques et organisationnelles raisonnables pour protéger vos informations personnelles contre l&apos;accès non autorisé, la perte ou l&apos;altération. Les paiements sont traités de manière sécurisée par nos partenaires certifiés PCI-DSS.</p>
          </div>

          <div>
            <h2 className="font-display text-[22px] font-bold mb-3" style={{ color: 'var(--color-text)' }}>5. Vos droits</h2>
            <p>Conformément à la législation applicable, vous disposez des droits suivants :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Accès :</strong> obtenir une copie de vos données personnelles</li>
              <li><strong>Rectification :</strong> corriger vos données inexactes</li>
              <li><strong>Suppression :</strong> demander la suppression de vos données</li>
              <li><strong>Opposition :</strong> vous opposer au traitement de vos données</li>
              <li><strong>Portabilité :</strong> recevoir vos données dans un format structuré</li>
            </ul>
            <p className="mt-2">Pour exercer ces droits, contactez-nous à <span className="text-gold-2">privacy@fecoa2026.ca</span>.</p>
          </div>

          <div>
            <h2 className="font-display text-[22px] font-bold mb-3" style={{ color: 'var(--color-text)' }}>6. Cookies</h2>
            <p>Notre site utilise des cookies essentiels au fonctionnement (session, thème) et Google Analytics pour mesurer l&apos;audience. Vous pouvez configurer votre navigateur pour refuser les cookies non essentiels.</p>
          </div>

          <div>
            <h2 className="font-display text-[22px] font-bold mb-3" style={{ color: 'var(--color-text)' }}>7. Contact</h2>
            <p>Pour toute question concernant cette politique, contactez-nous à <span className="text-gold-2">privacy@fecoa2026.ca</span>.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
