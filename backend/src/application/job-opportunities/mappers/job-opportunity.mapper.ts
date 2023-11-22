import { t } from 'i18next'
import { JobOpportunity } from '../domain/job-opportunity'
import { JobOpportunity as PersistenceJobOpportunity } from '@prisma/client'

export class JobOpportunityMapper {
  static toDomain(raw: PersistenceJobOpportunity) {
    const jobOpportunityOrError = JobOpportunity.create(
      {
        office: raw.office,
        requirements: raw.requirements,
        hours: raw.hours,
        wage: raw.wage,
      },
      raw.id,
    )

    if (jobOpportunityOrError.isLeft()) {
      throw new Error(t('errors.invalid_Photographer'))
    }

    return jobOpportunityOrError.value
  }

  static async toPersistence(jobOpportunity: JobOpportunity) {
    return {
      id: jobOpportunity.id,
      office: jobOpportunity.props.office,
      requirements: jobOpportunity.props.requirements,
      hours: jobOpportunity.props.hours,
      wage: jobOpportunity.props.wage,
    }
  }
}
