import LanguageDetector, {
  DetectorOptions
} from 'i18next-browser-languagedetector'

const options: DetectorOptions = {
  /**
   * Ordem e de onde o idioma do usuário deve ser detectado
   */
  order: ['localStorage', 'cookie'],

  /**
   * Chaves ou parâmetros para procurar o idioma
   */
  lookupLocalStorage: 'lang',
  lookupCookie: 'lang',

  /**
   * Cache o idioma em cookies e/ou localStorage
   */
  caches: ['localStorage', 'cookie']
}

export const languageDetector = new LanguageDetector(null, options)
