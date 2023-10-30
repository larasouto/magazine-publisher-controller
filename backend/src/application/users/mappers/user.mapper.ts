import { Password } from '@/core/domain/password'
import {
  Address as PersistenceAddress,
  Card as PersistenceCard,
  Subscription as PersistenceSubscription,
  User as PersistenceUser,
} from '@prisma/client'
import { t } from 'i18next'
import { User } from '../domain/user'

export type UserDetails = PersistenceUser & {
  addresses: PersistenceAddress[]
  cards: PersistenceCard[]
  subscriptions: PersistenceSubscription[]
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

  static toUserDetails(user: UserDetails): UserDetails {
    return {
      ...user,
      addresses: user.addresses,
      cards: user.cards,
      subscriptions: user.subscriptions,
    }
  }
}
