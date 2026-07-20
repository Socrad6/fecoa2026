'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { Locale, translations, defaultLocale } from '@/lib/i18n'

interface I18nContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextValue>({
  locale: defaultLocale,
  setLocale: () => {},
  t: (key) => key,
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('fecoa_lang') as Locale) || defaultLocale
    }
    return defaultLocale
  })

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    localStorage.setItem('fecoa_lang', l)
    document.documentElement.lang = l
  }, [])

  const t = useCallback((key: string): string => {
    return translations[locale]?.[key] || translations[defaultLocale]?.[key] || key
  }, [locale])

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
