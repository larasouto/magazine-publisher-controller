import { Either, left, right } from '@/core/logic/either'
import { ISubscriptionsRepository } from '../../repositories/interfaces/ISubscriptionsRepository'
import { OneOrMoreSubscriptionNotFoundError } from './errors/OneOrMoreSubscriptionNotFoundError'
import { SubscriptionNotFoundError } from './errors/SubscriptionNotFoundError'

type DeleteSubscriptionRequest = {
  ids: string[]
}

type DeleteSubscriptionResponse = Either<SubscriptionNotFoundError, null>

export class DeleteSubscription {
  constructor(private subscriptionsRepository: ISubscriptionsRepository) {}

  async execute({
    ids: subscriptionId,
  }: DeleteSubscriptionRequest): Promise<DeleteSubscriptionResponse> {
    const subscriptionOrSubscriptions = Array.isArray(subscriptionId)
      ? subscriptionId
      : [subscriptionId]

    if (subscriptionOrSubscriptions.length === 0) {
      return left(new OneOrMoreSubscriptionNotFoundError())
    }

    const subscriptionPromises = subscriptionOrSubscriptions
      .filter((subscriptionId) => subscriptionId)
      .map((subscriptionId) =>
        this.subscriptionsRepository.findById(subscriptionId),
      )

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
