import { describe, expect, test } from 'vitest'
import { Card } from './card'
import { v4 as uuid } from 'uuid'

describe('Entity Card', () => {
  test('should be able to create a card', () => {
    const data: any = {
      number: '1234567890123456',
      holder: 'card-holder',
      expirationDate: '12/2025',
      securityCode: 123,
      billingAddress: 'billing-address',
      phone: '(55) 9.9999-9999',
      type: 0,
      flag: 'card-flag',
      userId: uuid(),
    }

    const sut = Card.create(data)
    expect(sut.isRight()).toBeTruthy()
  })

  test('should not be able to create a card with invalid data', () => {
    const data: any = {}

    const sut = Card.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })
})
