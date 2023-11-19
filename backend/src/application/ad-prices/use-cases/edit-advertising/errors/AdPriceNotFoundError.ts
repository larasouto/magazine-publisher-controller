import { t } from 'i18next'

export class AdPriceNotFoundError extends Error {
  constructor() {
    super(t('advertising.not_found'))
    this.name = 'AdvertisingNotFoundError'
  }
}
