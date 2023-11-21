import { t } from 'i18next'

export class JobOpportunityNotFoundError extends Error {
  constructor() {
    super(t('jobOpportunity.not_found'))
    this.name = 'JobOpportunityNotFoundError'
  }
}
