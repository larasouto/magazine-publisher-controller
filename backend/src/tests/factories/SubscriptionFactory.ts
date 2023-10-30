import { Subscription } from '@/application/subscriptions/domain/subscription'
import {
  SubscriptionProps,
  SubscriptionType,
  SubscriptionFrequency,
} from '@/application/subscriptions/domain/subscription.schema'

type SubscriptionOverrides = {
  name?: string
  description?: string
  type?: SubscriptionType
  frequency?: SubscriptionFrequency
  price?: number
  magazineId?: string
  userId?: string
}

export class SubscriptionFactory {
  static create(overrides?: SubscriptionOverrides) {
    const subscription = Subscription.create({
      name: 'test-subscription-name',
      description: 'test-subscription-description',
      type: SubscriptionType.PREMIUM,
      frequency: SubscriptionFrequency.MONTHLY,
      price: 49.99,
      magazineId: 'test-magazine-id',
      userId: 'test-user-id',
      ...overrides,
    })

    return subscription.value as Subscription
  }
}
