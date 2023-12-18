import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { Either, left, right } from '@/core/logic/either'
import { ISubscriptionsRepository } from '../../repositories/interfaces/ISubscriptionsRepository'
import { SubscriptionNotFoundError } from './errors/SubscriptionNotFoundError'
import { UserNotFoundError } from './errors/UserNotFoundError'

type RenewSubscriptionRequest = {
  subscriptionId: string
  userId: string
}

type RenewSubscriptionResponse = Either<SubscriptionNotFoundError, null>

export class RenewSubscription {
  constructor(
    private subscriptionsRepository: ISubscriptionsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    subscriptionId,
    userId,
  }: RenewSubscriptionRequest): Promise<RenewSubscriptionResponse> {
    const renewSubscription =
      await this.subscriptionsRepository.exists(subscriptionId)

    if (!renewSubscription) {
      return left(new SubscriptionNotFoundError())
    }

    const user = this.usersRepository.findById(userId)

    if (!user) {
      return left(new UserNotFoundError())
    }

    await this.subscriptionsRepository.activate(subscriptionId)

    return right(null)
  }
}
