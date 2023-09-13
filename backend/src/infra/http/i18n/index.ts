import i18next from 'i18next'
import Backend from 'i18next-fs-backend'

export const langs = ['en-US', 'pt-BR']

i18next.use(Backend).init({
  supportedLngs: langs,
  initImmediate: false,
  lng: 'en-US',
  fallbackLng: 'en-US',
  ns: ['default'],
  backend: {
    loadPath: './src/infra/http/i18n/locales/{{lng}}/{{ns}}.json',
  },
})
