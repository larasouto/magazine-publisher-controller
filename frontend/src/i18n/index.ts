import i18next from 'i18next'
import HttpBackend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import { z } from 'zod'
import { makeZodI18nMap } from 'zod-i18n-map'
import { languageDetector } from './language-detector'
import { zod } from './zod'

export type Lang = 'en-US' | 'pt-BR'
export const langs: Array<Lang> = ['en-US', 'pt-BR']

const LOAD_PATH = import.meta.env.VITE_LOAD_PATH_LOCALES

const i18n = i18next
  .use(HttpBackend)
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    partialBundledLanguages: true,
    fallbackLng: 'en-US',
    ns: ['common'],
    defaultNS: 'common',
    supportedLngs: langs,
    backend: {
      loadPath: LOAD_PATH
    },
    resources: zod
  })

z.setErrorMap(makeZodI18nMap({ ns: ['zod', 'custom'] }))

export default i18n
