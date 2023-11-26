import { describe, expect, test } from 'vitest'
import { Subscription } from './subscription'
import { SubscriptionStatus } from './subscription.schema'
import { v4 as uuid } from 'uuid'

describe('Entity Subscription', () => {
  test('should be able to create a subscription', () => {
    const data: any = {
      subscriptionId: uuid(),
      status: SubscriptionStatus.ACTIVE,
      userId: uuid(),
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
