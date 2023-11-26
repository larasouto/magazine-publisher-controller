
import { Subscription } from '../../domain/subscription'
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

  async create(subscription: Subscription): Promise<void> {
    this.subscriptions.push(subscription)
  }

  async deleteMany(ids: string[]): Promise<void> {
    ids.forEach((id) => {
      const subscriptionIndex = this.subscriptions.findIndex(
        (subscription) => subscription.id === id,
      )

      this.subscriptions.splice(subscriptionIndex, 1)
    })
  }

  async update(subscription: Subscription): Promise<void> {
    const subscriptionIndex = this.subscriptions.findIndex(
      (subscription) => subscription.id === subscription.id,
    )

    this.subscriptions[subscriptionIndex] = subscription
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
}
