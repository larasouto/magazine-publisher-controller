import { t } from 'i18next'

export class ThemeNotFoundError extends Error {
  constructor() {
    super(t('theme.not_found'))
    this.name = 'ThemeNotFoundError'
  }
}
