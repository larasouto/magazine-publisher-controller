import { t } from 'i18next'

export class SubtitleNotFoundError extends Error {
  constructor() {
    super(t('theme.not_found'))
    this.name = 'ThemeNotFoundError'
  }
}
