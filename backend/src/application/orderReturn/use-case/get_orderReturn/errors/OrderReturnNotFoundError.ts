import { t } from 'i18next'

export class OrderReturnNotFoundError extends Error {
  constructor() {
    super(t('orderReturn.not_found'))
    this.name = 'OrderReturnNotFoundError'
  }
}
