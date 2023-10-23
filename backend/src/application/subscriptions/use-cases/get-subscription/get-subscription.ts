import { Either, left, right } from '@/core/logic/either'
import { Subscription } from '../../domain/subscription'
import { ISubscriptionsRepository } from '../../repositories/interfaces/ISubscriptionsRepository'
import { SubscriptionNotFoundError } from './errors/SubscriptionNotFoundError'

type GetSubscriptionRequest = {
  subscriptionId: string
}

type GetSubscriptionResponse = Either<SubscriptionNotFoundError, Subscription>

export class GetSubscription {
  constructor(private subscriptionsRepository: ISubscriptionsRepository) {}

  async execute({ subscriptionId }: GetSubscriptionRequest): Promise<GetSubscriptionResponse> {
    const subscription = await this.subscriptionsRepository.findById(subscriptionId)

    if (!subscription) {
      return left(new SubscriptionNotFoundError())
    }

    return right(subscription)
  }
}
