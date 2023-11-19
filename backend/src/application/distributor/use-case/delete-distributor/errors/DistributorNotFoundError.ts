import { t } from 'i18next'

export class DistributorNotFoundError extends Error {
  constructor() {
    super(t('distributor.not_found'))
    this.name = 'DistributorNotFoundError'
  }
}
