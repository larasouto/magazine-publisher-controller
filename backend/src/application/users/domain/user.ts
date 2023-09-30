import { ZodValidate } from '@/core/@types/ZodValidate'
import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import { UserProps, UserSchema } from './user.schema'

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super(props, id)
  }

  static create(props: UserProps, id?: string): Either<Error, User> {
    const result = UserSchema.safeParse(props) as ZodValidate<UserProps>

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new User(result.data, id))
  }
}
