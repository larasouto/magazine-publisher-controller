import { User as PersistenceUser } from '@prisma/client'
import { User } from '../domain/user'
import { t } from 'i18next'
import { Password } from '@/core/domain/password'

export class UserMapper {
  static toDomain(raw: PersistenceUser) {
    const userOrError = User.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
      },
      raw.id,
    )

    if (userOrError.isLeft()) {
      throw new Error(t('errors.invalid_user'))
    }

    if (userOrError.isRight()) {
      return userOrError.value
    }
    return null
  }

  static async toPersistence(user: User) {
    const hashed = Password.create(user.props.password, true)

    if (hashed.isLeft()) {
      throw new Error(t('errors.invalid_hash_password'))
    }

    return {
      id: user.id,
      name: user.props.name,
      email: user.props.email,
      password: await hashed.value.getHashedValue(),
      phone: user.props.phone,
    }
  }
}
