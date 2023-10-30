import { Either, left, right } from '@/core/logic/either'
import { Subscription } from '../../domain/subscription'
import { ISubscriptionsRepository } from '../../repositories/interfaces/ISubscriptionsRepository'
import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { MagazineNotFoundError } from './errors/MagazineNotFoundError'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { UserNotFoundError } from './errors/UserNotFoundError'

type CreateSubscriptionRequest = {
  name: string
  description: string
  type: number
  frequency: number
  price: number
  magazineId: string
  userId: string
}

type CreateSubscriptionResponse = Either<Error, Subscription>

export class CreateSubscription {
  constructor(
    private subscriptionsRepository: ISubscriptionsRepository,
    private magazinesRepository: IMagazineRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute(
    request: CreateSubscriptionRequest,
  ): Promise<CreateSubscriptionResponse> {
    const subscriptionOrError = Subscription.create(request)

    if (subscriptionOrError.isLeft()) {
      return left(subscriptionOrError.value)
    }

    const magazineExists = await this.magazinesRepository.exists(
      request.magazineId,
    )

    if (!magazineExists) {
      return left(new MagazineNotFoundError())
    }

    const userExists = await this.usersRepository.findById(request.userId)

    if (!userExists) {
      return left(new UserNotFoundError())
    }

    const subscription = subscriptionOrError.value
    await this.subscriptionsRepository.create(subscription)

    return right(subscription)
  }
}
