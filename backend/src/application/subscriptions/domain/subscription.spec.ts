import { describe, expect, test } from 'vitest'
import { Subscription } from './subscription'
import { SubscriptionFrequency, SubscriptionType } from './subscription.schema'
import { v4 as uuid } from 'uuid'

describe('Entity Subscription', () => {
  test('should be able to create a subscription', () => {
    const data: any = {
      name: 'test-subscription',
      description: 'test-subscription-description',
      type: SubscriptionType.PREMIUM,
      frequency: SubscriptionFrequency.MONTHLY,
      price: 49.99,
      magazineId: uuid(),
    }

    const sut = Subscription.create(data)
    expect(sut.isRight()).toBeTruthy()
  })

  test('should not be able to create a subscription with invalid data', () => {
    const data: any = {}

    const sut = Subscription.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })
})
