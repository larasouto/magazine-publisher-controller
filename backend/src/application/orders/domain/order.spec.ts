import { describe, expect, test } from 'vitest'
import { Order } from './order'
import { v4 as uuid } from 'uuid'

describe('Entity Order', () => {
  test('should be able to create a order', () => {
    const data: any = {
      id: uuid(),
      customerId: uuid(),
      addressId: uuid(),
      items: [
        {
          id: uuid(),
          quantity: 1,
        },
      ],
      paymentMethod: 1,
      status: 1,
      totalValue: 100,
    }

    const sut = Order.create(data)
    expect(sut.isRight()).toBeTruthy()
  })

  test('should not be able to create a order with invalid data', () => {
    const data: any = {}

    const sut = Order.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })
})
