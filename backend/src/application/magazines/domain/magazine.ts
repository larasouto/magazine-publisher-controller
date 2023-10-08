import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import { MagazineProps, MagazineSchema } from './magazine.schema'

export class Magazine extends Entity<MagazineProps> {
  private constructor(props: MagazineProps, id?: string) {
    super(props, id)
  }

  static create(props: MagazineProps, id?: string): Either<Error, Magazine> {
    const result = MagazineSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new Magazine(result.data, id))
  }
}
