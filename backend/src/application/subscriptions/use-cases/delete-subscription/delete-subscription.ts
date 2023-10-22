import { Either, left, right } from '@/core/logic/either'
import { ISubscriptionsRepository } from '../../repositories/interfaces/ISubscriptionsRepository'
import { SubscriptionNotFoundError } from './errors/SubscriptionNotFoundError'
import { OneOrMoreSubscriptionNotFoundError } from './errors/OneOrMoreSubscriptionNotFoundError'

type DeleteSubscriptionRequest = {
  subscriptionId: string[]
}

type DeleteSubscriptionResponse = Either<SubscriptionNotFoundError, null>

export class DeleteSubscription {
  constructor(private subscriptionsRepository: ISubscriptionsRepository) {}

  async execute({
    subscriptionId,
  }: DeleteSubscriptionRequest): Promise<DeleteSubscriptionResponse> {
    const subscriptionOrSubscriptions = Array.isArray(subscriptionId)
      ? subscriptionId
      : [subscriptionId]

    const subscriptionPromises = subscriptionOrSubscriptions
      .filter((subscriptionId) => subscriptionId)
      .map((subscriptionId) => this.subscriptionsRepository.findById(subscriptionId))

    const subscriptions = await Promise.all(subscriptionPromises)

    if (subscriptions.some((subscription) => subscription === null)) {
      return left(
        subscriptions.length > 1
          ? new OneOrMoreSubscriptionNotFoundError()
          : new SubscriptionNotFoundError(),
      )
    }

    await this.subscriptionsRepository.deleteMany(subscriptionOrSubscriptions)

    return right(null)
  }
}
