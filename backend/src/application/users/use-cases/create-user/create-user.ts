import { Either, left, right } from '@/core/logic/either'
import { User } from '../../domain/user'
import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository'
import { UserAlreadyExistsError } from './errors/UserAlreadyExistsError'
import { UserRole } from '../../domain/user.schema'

type CreateUserRequest = {
  email: string
  name: string
  password: string
  phone?: string
}

type CreateUserResponse = Either<UserAlreadyExistsError, User>

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
      role: UserRole.CUSTOMER,
    })

    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    const user = userOrError.value

    const userAlreadyExists = await this.usersRepository.exists(
      user.props.email,
    )

    if (userAlreadyExists) {
      return left(new UserAlreadyExistsError())
    }

    await this.usersRepository.create(user)

    return right(user)
  }
}
