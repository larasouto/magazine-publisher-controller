import { ZodValidate } from '@/core/@types/ZodValidate'
import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import { PhotographerProps, PhotographerSchema } from './photographer.schema'

export class Photographer extends Entity<PhotographerProps> {
  private constructor(props: PhotographerProps, id?: string) {
    super(props, id)
  }

  static create(
    props: PhotographerProps,
    id?: string,
  ): Either<Error, Photographer> {
    const result = PhotographerSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new Photographer(result.data, id))
  }
}
