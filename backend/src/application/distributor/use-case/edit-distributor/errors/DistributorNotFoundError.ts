import { t } from 'i18next'

export class distributorNotFoundError extends Error {
  constructor() {
    super(t('distributor.not_found'))
    this.name = 'distributorNotFoundError'
  }
}
