import { describe, expect, test } from 'vitest'
import { Address } from './address'
import { v4 as uuid } from 'uuid'

describe('Entity Address', () => {
  test('should be able to create a address', () => {
    const data: any = {
      street: 'test-street',
      number: 123,
      city: 'test-city',
      state: 'test-state',
      zip: '12345-678',
      complement: 'test-complement',
      userId: uuid(),
    }

    const sut = Address.create(data)

    expect(sut.isRight()).toBeTruthy()
  })

  test('should not be able to create a address with invalid data', () => {
    const data: any = {}

    const sut = Address.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })
})
