import { t } from 'i18next'

export class OneOrMoreSubscriptionNotFoundError extends Error {
  constructor() {
    super(t('subscription.one_or_more_not_found'))
    this.name = 'OneOrMoreSubscriptionNotFoundError'
  }
}
