import { t } from 'i18next'

export class AddressNotFoundError extends Error {
  constructor() {
    super(t('address.not_found'))
    this.name = 'AddressNotFoundError'
  }
}
