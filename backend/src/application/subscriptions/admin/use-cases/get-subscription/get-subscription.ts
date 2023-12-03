import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { Either, left, right } from '@/core/logic/either'
import { Subscription } from '../../domain/subscription'
import { ISubscriptionsRepository } from '../../repositories/interfaces/ISubscriptionsRepository'
import { SubscriptionNotFoundError } from './errors/SubscriptionNotFoundError'
import { UserNotFoundError } from './errors/UserNotFoundError'

type GetSubscriptionRequest = {
  subscriptionId: string
  userId: string
}

type GetSubscriptionResponse = Either<SubscriptionNotFoundError, Subscription>

export class GetSubscription {
  constructor(
    private subscriptionsRepository: ISubscriptionsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    subscriptionId,
    userId,
  }: GetSubscriptionRequest): Promise<GetSubscriptionResponse> {
    const subscription =
      await this.subscriptionsRepository.findById(subscriptionId)

    if (!subscription) {
      return left(new SubscriptionNotFoundError())
    }

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new UserNotFoundError())
    }

    return right(subscription)
  }
}
