'use client'

import { useI18n } from '@/components/ui/I18nProvider'

export default function LangSwitcher() {
  const { locale, setLocale } = useI18n()

  return (
    <button
      onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')}
      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[rgba(200,155,60,.1)] hover:text-gold-2 border border-transparent hover:border-[rgba(200,155,60,.15)] text-[11px] font-bold"
      style={{ color: 'var(--color-text)' }}
      aria-label={`Switch to ${locale === 'fr' ? 'English' : 'Français'}`}
      title={locale === 'fr' ? 'English' : 'Français'}
    >
      {locale === 'fr' ? 'EN' : 'FR'}
    </button>
  )
}
