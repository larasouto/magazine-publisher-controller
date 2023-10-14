import { ZodValidate } from '@/core/@types/ZodValidate'
import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import { AdvertisingProps, AdvertisingSchema } from './advertising.schema'

export class Advertising extends Entity<AdvertisingProps> {
  private constructor(props: AdvertisingProps, id?: string) {
    super(props, id)
  }

  static create(
    props: AdvertisingProps,
    id?: string,
  ): Either<Error, Advertising> {
    const result = AdvertisingSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new Advertising(result.data, id))
  }
}
