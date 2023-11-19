import { t } from 'i18next'

export class OneOrMoreReviewNotFoundError extends Error {
  constructor() {
    super(t('review.one_or_more_not_found'))
    this.name = 'OneOrMoreReviewNotFoundError'
  }
}
