import { t } from 'i18next'

export class PhotographerNotFoundError extends Error {
  constructor() {
    super(t('photographer.not_found'))
    this.name = 'PhotographerNotFoundError'
  }
}
