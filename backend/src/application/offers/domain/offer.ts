import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import { OfferProps, OfferSchema } from './offer.schema'

export class Offer extends Entity<OfferProps> {
  private constructor(props: OfferProps, id?: string) {
    super(props, id)
  }

  static create(props: OfferProps, id?: string): Either<Error, Offer> {
    const result = OfferSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new Offer(result.data, id))
  }
}
