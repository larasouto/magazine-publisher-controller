import { raw } from 'express'
import { read } from 'fs'
import { t } from 'i18next'
import { JobOpportunitty } from '../domain/job-opportunity'

export class JobOpportunittyMapper {
  static toDomain(raw: PersistenceJobOpportunitty) {
    const JobOpportunittyOrError = JobOpportunitty.create(
      {
        office: raw.office,
        requirements: raw.requirements,
        hours: raw.hours,
        wage: raw.wage,
      },
      raw.id,
    )

    if (jobOpportunittyOrError.isLeft()) {
      throw new Error(t('errors.invalid_Photographer'))
    }

    return jobOpportunittyOrError.value
  }

  static async toPersistence(jobOpportunitty: JobOpportunitty) {
    return {
      id: jobOpportunitty.id,
      office: jobOpportunitty.props.office,
      requirements: jobOpportunitty.props.requirements,
      hours: jobOpportunitty.props.hours,
      wage: jobOpportunitty.props.wage,
    }
  }
}
