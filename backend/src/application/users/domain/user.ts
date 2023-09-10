import { UserProps, UserSchema } from './user.schema'
import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super(props, id)
  }

  static create(props: UserProps, id?: string): Either<Error, User> {
    const result = UserSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new User(result.data, id))
  }
}
