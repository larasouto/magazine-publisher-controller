import { Either, left, right } from '@/core/logic/either'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { InvalidEmailOrPasswordError } from './errors/InvalidEmailOrPasswordError'
import { Password } from '@/core/domain/password'
import { JWT } from '../../../../core/domain/jwt'
import { compare } from 'bcryptjs'

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

  async execute({
    email,
    password,
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return left(new InvalidEmailOrPasswordError())
    }

    const isPasswordValid = await compare(password, user.props.password)

    if (!isPasswordValid) {
      return left(new InvalidEmailOrPasswordError())
    }

    const { token } = JWT.signUser(user)

    return right({ token })
  }
}
