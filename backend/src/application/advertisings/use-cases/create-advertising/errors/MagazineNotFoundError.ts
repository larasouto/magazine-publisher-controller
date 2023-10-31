import { t } from 'i18next'

export class MagazineNotFoundError extends Error {
  constructor() {
    super(t('magazine.not_found'))
    this.name = 'MagazineNotFoundError'
  }
}
