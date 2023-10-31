import { t } from 'i18next'

export class PaymentSubscriptionNotFoundError extends Error {
  constructor() {
    super(t('payment_subscription.not_found'))
    this.name = 'PaymentSubscriptionNotFoundError'
  }
}
