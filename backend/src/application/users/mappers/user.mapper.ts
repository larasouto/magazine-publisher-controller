import { User as PersistenceUser } from '@prisma/client'
import { User } from '../domain/user'
import { t } from 'i18next'
import { Password } from '@/core/domain/password'

export class UserMapper {
  static toDomain(raw: PersistenceUser) {
    const user: Pick<User, 'props'> = {
      props: {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        phone: raw.phone,
        role: raw.role,
      },
    }

    const userOrError = User.create(user.props, raw.id)

    if (userOrError.isLeft()) {
      throw new Error(t('errors.invalid_user'))
    }

    return userOrError.value
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
