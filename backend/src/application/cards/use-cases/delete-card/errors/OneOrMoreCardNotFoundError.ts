import { t } from 'i18next'

export class OneOrMoreCardNotFoundError extends Error {
  constructor() {
    super(t('card.one_or_more_not_found'))
    this.name = 'OneOrMoreCardNotFoundError'
  }
}
