import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'FÉCOA 2026 — Foire Économique et Culturelle Ouest-Africaine',
  description: '17–20 Décembre 2026 · Montréal, Canada. Cinq jours d\'échanges commerciaux, de culture et de rencontres entre l\'Afrique de l\'Ouest et le Canada.',
  keywords: ['FÉCOA', 'foire', 'Afrique de l\'Ouest', 'Montréal', '2026', 'économie', 'culture', 'Sénégal', 'Guinée', 'Mali', 'diaspora'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
