import { Either, left, right } from '@/core/logic/either'
import { User } from '../../domain/user'
import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository'
import { UserNotFoundError } from './errors/UserNotFoundError'
import { UserDetails } from '../../mappers/user.mapper'

type GetUserDetailsRequest = {
  userId: string
}

type GetUserDetailsResponse = Either<UserNotFoundError, UserDetails>

export class GetUserDetails {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    userId,
  }: GetUserDetailsRequest): Promise<GetUserDetailsResponse> {
    console.log(userId)
    if (!userId) {
      return left(new UserNotFoundError())
    }

    const user = await this.usersRepository.getDetails(userId)

    if (!user) {
      return left(new UserNotFoundError())
    }

    return right(user)
  }
}
