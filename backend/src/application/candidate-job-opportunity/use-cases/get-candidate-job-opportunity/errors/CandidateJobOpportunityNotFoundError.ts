import { t } from 'i18next'

export class CandidateJobOpportunityNotFoundError extends Error {
  constructor() {
    super(t('candidateJobOpportunity.not_found'))
    this.name = 'CandidateJobOpportunityNotFoundError'
  }
}
