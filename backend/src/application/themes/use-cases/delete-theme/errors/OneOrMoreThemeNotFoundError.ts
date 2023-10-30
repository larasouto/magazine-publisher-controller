import { t } from 'i18next'

export class OneOrMoreThemeNotFoundError extends Error {
  constructor() {
    super(t('theme.one_or_more_not_found'))
    this.name = 'OneOrMoreThemeNotFoundError'
  }
}
