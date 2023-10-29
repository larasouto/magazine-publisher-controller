import { describe, expect, test } from 'vitest'
import { v4 as uuid } from 'uuid'
import { OrderReturn } from './orderReturn'

describe('Entity OrderReturn', () => {
  test('should be able to create a orderReturn', () => {
    const data: any = {
      returnDate: new Date(),
      returnNumber: 12,
      orderId: uuid(),
    }

    const sut = OrderReturn.create(data)
    expect(sut.isRight()).toBeTruthy()
  })

  test('should not be able to create a orderReturn with invalid data', () => {
    const data: any = {
      returnDate: null,
      returnNumber: null,
      orderId: null,
    }

    const sut = OrderReturn.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })
})
