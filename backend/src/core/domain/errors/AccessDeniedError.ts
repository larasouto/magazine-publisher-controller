import { t } from 'i18next'

export class AccessDeniedError extends Error {
  constructor() {
    super(t('errors.access_denied'))
    this.name = 'AccessDeniedError'
  }
}
