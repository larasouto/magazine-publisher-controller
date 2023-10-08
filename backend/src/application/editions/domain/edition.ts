import { ZodValidate } from '@/core/@types/ZodValidate'
import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import { EditionProps, EditionSchema } from './edition.schema'

export class Edition extends Entity<EditionProps> {
  private constructor(props: EditionProps, id?: string) {
    super(props, id)
  }

  static create(props: EditionProps, id?: string): Either<Error, Edition> {
    const result = EditionSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new Edition(result.data, id))
  }
}
