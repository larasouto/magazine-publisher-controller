import { t } from 'i18next'

export class CategoryNotFoundError extends Error {
  constructor() {
    super(t('category.not_found'))
    this.name = 'CategoryNotFoundError'
  }
}
