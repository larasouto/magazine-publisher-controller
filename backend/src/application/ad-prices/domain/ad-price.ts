import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import { AdPriceProps, AdPriceSchema } from './ad-price.schema'

export class AdPrice extends Entity<AdPriceProps> {
  private constructor(props: AdPriceProps, id?: string) {
    super(props, id)
  }

  static create(props: AdPriceProps, id?: string): Either<Error, AdPrice> {
    const result = AdPriceSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new AdPrice(result.data, id))
  }
}
