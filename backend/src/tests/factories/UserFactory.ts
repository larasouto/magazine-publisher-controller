import { User } from '@/application/users/domain/user'
import { JWT } from '@/core/domain/jwt'

type UserOverrides = {
  email?: string
  password?: string
}

export class UserFactory {
  static create(overrides?: UserOverrides) {
    const user = User.create({
      name: 'just-for-tests',
      email: overrides?.email || 'just-for-tests@email.com',
      password: overrides?.password || '12345678',
    })

    return user.value as User
  }

  static createAndAuthenticate() {
    const user = UserFactory.create()
    const jwt = JWT.signUser(user)

    return {
      user,
      jwt,
    }
  }
}
