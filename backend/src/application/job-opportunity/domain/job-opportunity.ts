import { ZodValidate } from '@/core/@types/ZodValidate'
import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import { JobOpportunittyProps, JobOpportunittySchema } from './job-opportunity.schema'


export class JobOpportunitty extends Entity<JobOpportunitty Props> {
  private constructor(props: JobOpportunitty Props, id?: string) {
    super(props, id)
  }

  static create(
    props: JobOpportunittyProps,
    id?: string,
  ): Either<Error, JobOpportunitty> {
    const result = JobOpportunittySchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new JobOpportunitty(result.data, id))
  }
}
