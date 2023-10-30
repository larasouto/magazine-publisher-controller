import { describe, expect, test } from 'vitest'
import { OrderItem } from './order-item'
import { v4 as uuid } from 'uuid'

describe('Entity OrderItem', () => {
  test('should be able to create a order item', () => {
    const data: any = {
      id: uuid(),
      quantity: 1,
      itemId: uuid(),
      orderId: uuid(),
    }

    const sut = OrderItem.create(data)
    expect(sut.isRight()).toBeTruthy()
  })

  test('should not be able to create a order item with invalid data', () => {
    const data: any = {}

    const sut = OrderItem.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })
})
