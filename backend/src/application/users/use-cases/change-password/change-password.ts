import { Either, left, right } from '@/core/logic/either'

import { UserDoesNotExistError } from './errors/UserDoesNotExistError'
import { User } from '../../domain/user'
import { compare } from 'bcryptjs'
import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository'
import { CurrentPaswordDoesNotMatchError } from './errors/CurrentPasswordDoesNotMatchError'

type ChangePasswordRequest = {
  userId: string
  currentPassword: string
  password: string
  confirmPassword: string
}

type ChangePassWordResponse = Either<UserDoesNotExistError, null>

export class ChangePassword {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    userId,
    currentPassword,
    password,
  }: ChangePasswordRequest): Promise<ChangePassWordResponse> {
    const userExists = await this.usersRepository.findById(userId)

    if (!userExists) {
      return left(new UserDoesNotExistError())
    }

    const {
      props: { password: dbPassword },
    } = userExists

    const isPasswordValid = await compare(currentPassword, dbPassword)

    if (!isPasswordValid) {
      return left(new CurrentPaswordDoesNotMatchError())
    }

    const userOrError = User.create({ ...userExists.props, password }, userId)

    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    const user = userOrError.value

    await this.usersRepository.update(user)

    return right(null)
  }
}
