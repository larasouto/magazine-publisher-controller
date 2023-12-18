import { Either, left, right } from '@/core/logic/either'
import { User } from '../../domain/user'
import { UserDoesNotExistError } from './errors/UserDoesNotExistError'
import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository'

type ResetPasswordRequest = {
  userId: string
  password: string
  confirmPassword: string
}

type ResetPassWordResponse = Either<UserDoesNotExistError, null>

export class ResetPassword {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    userId,
    password,
  }: ResetPasswordRequest): Promise<ResetPassWordResponse> {
    const userExists = await this.usersRepository.findById(userId)

    if (!userExists) {
      return left(new UserDoesNotExistError())
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
