import { translations, locales } from '@/lib/i18n'

describe('i18n', () => {
  it('has both locales defined', () => {
    expect(locales).toContain('fr')
    expect(locales).toContain('en')
  })

  it('has translations for all keys in both locales', () => {
    const frKeys = Object.keys(translations.fr)
    const enKeys = Object.keys(translations.en)

    for (const key of frKeys) {
      expect(enKeys).toContain(key)
    }
    for (const key of enKeys) {
      expect(frKeys).toContain(key)
    }
  })

  it('has non-empty translations for all keys', () => {
    for (const locale of locales) {
      for (const [key, value] of Object.entries(translations[locale])) {
        expect(value).toBeTruthy()
        expect(typeof value).toBe('string')
      }
    }
  })
})
