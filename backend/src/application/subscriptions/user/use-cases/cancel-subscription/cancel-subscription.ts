import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { Either, left, right } from '@/core/logic/either'
import { ISubscriptionsRepository } from '../../repositories/interfaces/ISubscriptionsRepository'
import { SubscriptionNotFoundError } from './errors/SubscriptionNotFoundError'
import { UserNotFoundError } from './errors/UserNotFoundError'

type CancelSubscriptionRequest = {
  subscriptionId: string
  userId: string
}

type CancelSubscriptionResponse = Either<SubscriptionNotFoundError, null>

export class CancelSubscription {
  constructor(
    private subscriptionsRepository: ISubscriptionsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    subscriptionId,
    userId,
  }: CancelSubscriptionRequest): Promise<CancelSubscriptionResponse> {
    const cancelSubscription =
      await this.subscriptionsRepository.findById(subscriptionId)

    if (!cancelSubscription) {
      return left(new SubscriptionNotFoundError())
    }

    const user = this.usersRepository.findById(userId)

    if (!user) {
      return left(new UserNotFoundError())
    }

    await this.subscriptionsRepository.inactivate(subscriptionId)

    return right(null)
  }
}
