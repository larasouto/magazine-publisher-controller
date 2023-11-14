import { t } from 'i18next'

export class ReviewerNotFoundError extends Error {
  constructor() {
    super(t('reviewer.not_found'))
    this.name = 'ReviewerNotFoundError'
  }
}
