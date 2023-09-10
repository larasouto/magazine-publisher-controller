import { Either, left, right } from '@/core/logic/either'
import { User } from '../../domain/user'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { UserAlreadyExists } from './errors/UserAlreadyExists'

type CreateUserRequest = {
  email: string
  name: string
  password: string
  phone?: string
}

type CreateUserResponse = Either<UserAlreadyExists, User>

export class CreateUser {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    email,
    name,
    password,
    phone,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const userOrError = User.create({
      email,
      name,
      password,
      phone,
    })

    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    const user = userOrError.value

    const userAlreadyExists = await this.usersRepository.exists(
      user.props.email,
    )

    if (userAlreadyExists) {
      return left(new UserAlreadyExists())
    }

    await this.usersRepository.create(user)

    return right(user)
  }
}
