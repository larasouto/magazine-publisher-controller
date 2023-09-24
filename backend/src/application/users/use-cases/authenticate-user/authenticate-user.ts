import { Either, left, right } from '@/core/logic/either'
import { compare } from 'bcryptjs'
import { JWT } from '../../../../core/domain/jwt'
import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository'
import { InvalidEmailOrPasswordError } from './errors/InvalidEmailOrPasswordError'

type TokenResponse = {
  token: string
}

type AuthenticateUserRequest = {
  email: string
  password: string
}

type AuthenticateUserResponse = Either<
  InvalidEmailOrPasswordError,
  TokenResponse
>

export class AuthenticateUser {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(
    request: AuthenticateUserRequest,
  ): Promise<AuthenticateUserResponse> {
    const user = await this.usersRepository.findByEmail(request.email)

    if (!user) {
      return left(new InvalidEmailOrPasswordError())
    }

    const isPasswordValid = await compare(request.password, user.props.password)

    if (!isPasswordValid) {
      return left(new InvalidEmailOrPasswordError())
    }

    const { token } = JWT.signUser(user)

    return right({ token })
  }
}
