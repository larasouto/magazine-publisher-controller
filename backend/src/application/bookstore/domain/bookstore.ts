import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import { BookstoreProps, BookstoreSchema } from './bookstore.schema'

export class Bookstore extends Entity<BookstoreProps> {
  private constructor(props: BookstoreProps, id?: string) {
    super(props, id)
  }

  static create(props: BookstoreProps, id?: string): Either<Error, Bookstore> {
    const result = BookstoreSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new Bookstore(result.data, id))
  }
}
