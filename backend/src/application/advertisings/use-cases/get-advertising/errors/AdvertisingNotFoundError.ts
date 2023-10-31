import { t } from 'i18next'

export class AdvertisingNotFoundError extends Error {
  constructor() {
    super(t('advertising.not_found'))
    this.name = 'AdvertisingNotFoundError'
  }
}
