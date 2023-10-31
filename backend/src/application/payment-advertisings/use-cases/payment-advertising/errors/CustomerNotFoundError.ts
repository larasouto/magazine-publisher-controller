import { t } from 'i18next'

export class CustomerNotFoundError extends Error {
  constructor() {
    super(t('customer.not_found'))
    this.name = 'CustomerNotFoundError'
  }
}
