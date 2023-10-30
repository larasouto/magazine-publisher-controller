import { t } from 'i18next'

export class OneOrMoreAddressNotFoundError extends Error {
  constructor() {
    super(t('address.one_or_more_not_found'))
    this.name = 'OneOrMoreAddressNotFoundError'
  }
}
