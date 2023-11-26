import { Subscription } from '../../domain/subscription'
import { SubscriptionStatus } from '../../domain/subscription.schema'
import { ISubscriptionsRepository } from '../interfaces/ISubscriptionsRepository'

export class InMemorySubscriptionsRepository
  implements ISubscriptionsRepository
{
  constructor(public subscriptions: Subscription[] = []) {}

  async findById(id: string): Promise<Subscription | null> {
    const subscription = this.subscriptions.find(
      (subscription) => subscription.id === id,
    )

    if (!subscription) {
      return null
    }

    return subscription
  }

  async exists(id: string): Promise<boolean> {
    const subscription = this.subscriptions.some(
      (subscription) => subscription.id === id,
    )
    return !!subscription
  }

  async list(): Promise<Subscription[]> {
    return this.subscriptions
  }

  async inactivate(id: string): Promise<void> {
    const subscriptionIndex = this.subscriptions.findIndex(
      (subscription) => subscription.id === id,
    )

    this.subscriptions[subscriptionIndex].props.status =
      SubscriptionStatus.INACTIVE
  }

  async activate(id: string): Promise<void> {
    const subscriptionIndex = this.subscriptions.findIndex(
      (subscription) => subscription.id === id,
    )

    this.subscriptions[subscriptionIndex].props.status =
      SubscriptionStatus.ACTIVE
  }
}
