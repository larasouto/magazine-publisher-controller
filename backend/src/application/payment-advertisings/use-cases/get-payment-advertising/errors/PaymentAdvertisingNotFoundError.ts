import { t } from 'i18next'

export class PaymentAdvertisingNotFoundError extends Error {
  constructor() {
    super(t('payment_advertising.not_found'))
    this.name = 'PaymentAdvertisingNotFoundError'
  }
}
