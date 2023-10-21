import { t } from 'i18next'

export class OneOrMoreCategoryNotFoundError extends Error {
  constructor() {
    super(t('category.one_or_more_not_found'))
    this.name = 'OneOrMoreCategoryNotFoundError'
  }
}
