import { Password } from '@/core/domain/password'
import {
  Address as PersistenceAddress,
  Card as PersistenceCard,
  Subscription as PersistenceSubscription,
  User as PersistenceUser,
} from '@prisma/client'
import { t } from 'i18next'
import { User } from '../domain/user'

export type UserDetails = {
  id: string
  name: string
  email: string
  role: number
}

export class UserMapper {
  static toDomain(raw: PersistenceUser) {
    const userOrError = User.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        phone: raw.phone,
        role: raw.role,
      },
      raw.id,
    )

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
      role: user.props.role,
    }
  }

  static toUserDetails(user: PersistenceUser): UserDetails {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }
  }
}
