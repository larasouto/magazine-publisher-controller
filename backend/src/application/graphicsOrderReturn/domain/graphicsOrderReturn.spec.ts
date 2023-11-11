import { describe, expect, test } from 'vitest'
import { v4 as uuid } from 'uuid'
import { GraphicsOrderReturn } from './graphicsOrderReturn'

describe('Entity GraphicsOrderReturn', () => {
  test('should be able to create a orderReturn', () => {
    const data: any = {
      returnDate: new Date(),
      returnNumber: 12,
      orderId: uuid(),
    }

    const sut = GraphicsOrderReturn.create(data)
    expect(sut.isRight()).toBeTruthy()
  })

  test('should not be able to create a orderReturn with invalid data', () => {
    const data: any = {
      returnDate: null,
      returnNumber: null,
      orderId: null,
    }

    const sut = GraphicsOrderReturn.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })
})
