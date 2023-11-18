import { t } from 'i18next'

export class ReviewNotFoundError extends Error {
  constructor() {
    super(t('review.not_found'))
    this.name = 'ReviewNotFoundError'
  }
}
