import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import { CandidateProps, CandidateSchema } from './candidate.schema'

export class Candidate extends Entity<CandidateProps> {
  private constructor(props: CandidateProps, id?: string) {
    super(props, id)
  }

  static create(props: CandidateProps, id?: string): Either<Error, Candidate> {
    const result = CandidateSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new Candidate(result.data, id))
  }
}
