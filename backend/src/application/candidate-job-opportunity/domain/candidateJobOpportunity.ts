import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import { CandidateJobOpportunityProps, CandidateJobOpportunitySchema } from './candidateJobOpportunity.schema'

export class CandidateJobOpportunity extends Entity<CandidateJobOpportunityProps> {
  private constructor(props: CandidateJobOpportunityProps, id?: string) {
    super(props, id)
  }

  static create(props: CandidateJobOpportunityProps, id?: string): Either<ZodValidationError, CandidateJobOpportunity> {
    const result = CandidateJobOpportunitySchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new CandidateJobOpportunity(result.data, id))
  }
}