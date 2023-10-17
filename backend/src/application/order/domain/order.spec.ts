import { describe, expect, test } from 'vitest'
import { Order } from './order'
import { Status } from './order.schema'
import { v4 as uuid } from 'uuid'

describe('Entity Order', () => {
  test('should be able to create a order', () => {
    const data: any = {
      receiptDate: new Date(),
      departureDate: new Date(),
      status: Status.deliv,
      deliveryAddress: 'order-deliveryAddress',
      exampleNumber: 12,
      price: 12,
      editonId: uuid(),
      graphicsDistributorId: uuid(),
    }

    const sut = Order.create(data)
    expect(sut.isRight()).toBeTruthy()
  })

  test('should not be able to create a order with invalid data', () => {
    const data: any = {
      receiptDate: null,
      departureDate: null,
      status: null,
      deliveryAddress: '',
      exampleNumber: null,
      price: null,
      editonId: uuid(),
      graphicsDistributorId: uuid(),
    }

    const sut = Order.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })
})
