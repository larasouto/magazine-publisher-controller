import { t } from 'i18next'

export class OrderNotFoundError extends Error {
  constructor() {
    super(t('order.not_found'))
    this.name = 'OrderNotFoundError'
  }
}
