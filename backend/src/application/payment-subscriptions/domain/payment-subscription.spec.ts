import { describe, expect, test } from 'vitest'
import { PaymentSubscription } from './payment-subscription'
import { v4 as uuid } from 'uuid'

describe('Entity Payment Subscription', () => {
  test('should be able to create a payment subscription', () => {
    const data: any = {
      customerId: uuid(),
      cardId: uuid(),
      status: 1,
      subscriptionId: uuid(),
      addressId: uuid(),
    }

    const sut = PaymentSubscription.create(data)
    expect(sut.isRight()).toBeTruthy()
  })

  test('should not be able to create a payment subscription with invalid data', () => {
    const data: any = {}

    const sut = PaymentSubscription.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })
})
