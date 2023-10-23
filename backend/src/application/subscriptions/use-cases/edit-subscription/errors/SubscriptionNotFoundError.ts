import { t } from 'i18next'

export class SubscriptionNotFoundError extends Error {
  constructor() {
    super(t('subscription.not_found'))
    this.name = 'SubscriptionNotFoundError'
  }
}
