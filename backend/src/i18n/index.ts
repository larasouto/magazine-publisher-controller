import i18next from 'i18next'
import Backend from 'i18next-fs-backend'

type TranslationFunction = (key: string, options?: any) => string

i18next.use(Backend).init({
  lng: 'en',
  fallbackLng: 'en',
  backend: {
    loadPath: './src/i18n/locales/{{lng}}.json'
  }
})

export const i18n: TranslationFunction = (key: string, options?: any) => {
  const language = i18next.language
  return i18next.t(key, { ...options, lng: language }) as unknown as string
}
