import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import { I18nProvider } from '@/components/ui/I18nProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Analytics from '@/components/ui/Analytics'

export const metadata: Metadata = {
  title: {
    default: 'FÉCOA 2026 — Foire Économique et Culturelle Ouest-Africaine',
    template: '%s | FÉCOA 2026',
  },
  description: "17–20 Décembre 2026 · Montréal, Canada. Quatre jours d'échanges commerciaux, de culture et de rencontres entre l'Afrique de l'Ouest et le Canada.",
  keywords: ['FÉCOA', 'foire', 'Afrique de l\'Ouest', 'Montréal', '2026', 'économie', 'culture', 'Sénégal', 'Guinée', 'Mali', 'diaspora', 'b2b', 'exposition'],
  authors: [{ name: 'FÉCOA 2026' }],
  creator: 'FÉCOA 2026',
  publisher: 'FÉCOA 2026',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  openGraph: {
    title: 'FÉCOA 2026 — Foire Économique et Culturelle Ouest-Africaine',
    description: '17–20 Décembre 2026 · Montréal, Canada. Commerce, culture et rencontres entre l\'Afrique de l\'Ouest et le Canada.',
    url: 'https://fecoa2026.vercel.app',
    siteName: 'FÉCOA 2026',
    locale: 'fr_CA',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'FÉCOA 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FÉCOA 2026',
    description: '17–20 Décembre 2026 · Montréal, Canada',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://fecoa2026.vercel.app' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <I18nProvider>
            <Analytics />
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
