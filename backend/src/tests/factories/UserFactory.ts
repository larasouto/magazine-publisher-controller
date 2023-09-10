import { User } from '@/application/users/domain/user'

type UserOverrides = {
  email?: string
  password?: string
}

export class UserFactory {
  static create(overrides?: UserOverrides) {
    const user = User.create({
      name: 'test',
      email: overrides?.email || 'test@test.com',
      password: overrides?.password || '12345678',
    })

    return user.value as User
  }
}
