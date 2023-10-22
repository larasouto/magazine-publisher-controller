import { Subscription } from '@/application/subscriptions/domain/subscription'
import {
  SubscriptionProps,
  SubscriptionType,
  SubscriptionFrequency,
} from '@/application/subscriptions/domain/subscription.schema'

type SubscriptionOverrides = SubscriptionProps

export class SubscriptionFactory {
  static create(overrides?: SubscriptionOverrides) {
    const subscription = Subscription.create({
      name: 'test-subscription-name',
      description: 'test-subscription-description',
      type: SubscriptionType.PREMIUM,
      frequency: SubscriptionFrequency.MONTHLY,
      price: 49.99,
      magazineId: 'test-magazine-id',
      ...overrides,
    })

    return subscription.value as Subscription
  }
}
