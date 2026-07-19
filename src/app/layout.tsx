import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Analytics from '@/components/ui/Analytics'

export const metadata: Metadata = {
  title: 'FÉCOA 2026 — Foire Économique et Culturelle Ouest-Africaine',
  description: "17–20 Décembre 2026 · Montréal, Canada. Quatre jours d'échanges commerciaux, de culture et de rencontres entre l'Afrique de l'Ouest et le Canada.",
  keywords: ['FÉCOA', 'foire', 'Afrique de l\'Ouest', 'Montréal', '2026', 'économie', 'culture', 'Sénégal', 'Guinée', 'Mali', 'diaspora'],
  openGraph: {
    title: 'FÉCOA 2026 — Foire Économique et Culturelle Ouest-Africaine',
    description: '17–20 Décembre 2026 · Montréal, Canada',
    url: 'https://fecoa2026.vercel.app',
    siteName: 'FÉCOA 2026',
    locale: 'fr_CA',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Analytics />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
