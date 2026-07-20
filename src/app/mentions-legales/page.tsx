import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales — FÉCOA 2026',
  description: 'Mentions légales du site web de la Foire Économique et Culturelle Ouest-Africaine 2026.',
}

export default function MentionsLegales() {
  return (
    <section className="py-[clamp(70px,9vh,128px)] px-[clamp(16px,5vw,80px)] pt-32 min-h-screen page-enter" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-[800px] mx-auto">
        <h1 className="font-display text-[clamp(32px,5vw,48px)] font-bold mb-8" style={{ color: 'var(--color-text)' }}>
          Mentions <span className="text-gold-2">légales</span>
        </h1>
        <p className="text-[13px] mb-8" style={{ color: 'var(--color-muted)' }}>Dernière mise à jour : 20 juillet 2026</p>

        <div className="space-y-8 text-[14px] leading-relaxed" style={{ color: 'var(--color-text-2)' }}>
          <div>
            <h2 className="font-display text-[22px] font-bold mb-3" style={{ color: 'var(--color-text)' }}>Éditeur du site</h2>
            <p>
              <strong>FÉCOA — Foire Économique et Culturelle Ouest-Africaine</strong><br />
              Montréal, Québec, Canada<br />
              Courriel : info@fecoa2026.ca<br />
              Téléphone : +1 (514) 555-0123
            </p>
          </div>

          <div>
            <h2 className="font-display text-[22px] font-bold mb-3" style={{ color: 'var(--color-text)' }}>Directeur de la publication</h2>
            <p>Le directeur de la publication est le représentant légal de l&apos;association organisatrice de la FÉCOA 2026.</p>
          </div>

          <div>
            <h2 className="font-display text-[22px] font-bold mb-3" style={{ color: 'var(--color-text)' }}>Hébergeur</h2>
            <p>
              <strong>Vercel Inc.</strong><br />
              340 S Lemon Ave #4133<br />
              Walnut, CA 91789, États-Unis<br />
              https://vercel.com
            </p>
          </div>

          <div>
            <h2 className="font-display text-[22px] font-bold mb-3" style={{ color: 'var(--color-text)' }}>Propriété intellectuelle</h2>
            <p>L&apos;ensemble du contenu de ce site (textes, images, graphismes, logos, icônes, sons, logiciels) est la propriété exclusive de la FÉCOA 2026 ou de ses partenaires et est protégé par les lois canadiennes et internationales relatives à la propriété intellectuelle.</p>
            <p className="mt-2">Toute reproduction, représentation, modification, publication, transmission ou dénaturation du site ou de son contenu, par quelque procédé que ce soit, est interdite sans autorisation préalable écrite.</p>
          </div>

          <div>
            <h2 className="font-display text-[22px] font-bold mb-3" style={{ color: 'var(--color-text)' }}>Données personnelles</h2>
            <p>Les informations personnelles collectées sur ce site sont traitées conformément à notre <a href="/politique-confidentialite" className="text-gold-2 underline">Politique de confidentialité</a>.</p>
          </div>

          <div>
            <h2 className="font-display text-[22px] font-bold mb-3" style={{ color: 'var(--color-text)' }}>Cookies</h2>
            <p>Ce site utilise Google Analytics pour mesurer l&apos;audience. Les données collectées par Google Analytics sont anonymisées et ne permettent pas l&apos;identification des visiteurs individuels. Vous pouvez désactiver Google Analytics en installant le module de désactivation disponible à l&apos;adresse suivante : https://tools.google.com/dlpage/gaoptout</p>
          </div>

          <div>
            <h2 className="font-display text-[22px] font-bold mb-3" style={{ color: 'var(--color-text)' }}>Contact</h2>
            <p>Pour toute question relative aux mentions légales, contactez-nous à <span className="text-gold-2">info@fecoa2026.ca</span>.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
