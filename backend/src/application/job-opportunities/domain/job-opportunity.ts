import { ZodValidate } from '@/core/@types/ZodValidate'
import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import { JobOpportunityProps, JobOpportunitySchema } from './job-opportunity.schema'


export class JobOpportunity extends Entity<JobOpportunityProps> {
  private constructor(props: JobOpportunityProps, id?: string) {
    super(props, id)
  }

  static create(
    props: JobOpportunityProps,
    id?: string,
  ): Either<Error, JobOpportunity> {
    const result = JobOpportunitySchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new JobOpportunity(result.data, id))
  }
}
