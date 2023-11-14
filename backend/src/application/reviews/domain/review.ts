import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import { ReviewProps, ReviewSchema } from './review.schema'

export class Review extends Entity<ReviewProps> {
  private constructor(props: ReviewProps, id?: string) {
    super(props, id)
  }

  static create(props: ReviewProps, id?: string): Either<Error, Review> {
    const result = ReviewSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new Review(result.data, id))
  }
}
