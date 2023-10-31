import { describe, expect, test } from 'vitest'
import { PaymentAdvertising } from './payment-advertising'
import { v4 as uuid } from 'uuid'

describe('Entity Payment Advertising', () => {
  test('should be able to create a payment advertising', () => {
    const data: any = {
      id: uuid(),
      customerId: uuid(),
      cardId: uuid(),
      status: 0,
      advertisingId: uuid(),
      addressId: uuid(),
    }

    const sut = PaymentAdvertising.create(data)
    expect(sut.isRight()).toBeTruthy()
  })

  test('should not be able to create a payment advertising with invalid data', () => {
    const data: any = {}

    const sut = PaymentAdvertising.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })
})
