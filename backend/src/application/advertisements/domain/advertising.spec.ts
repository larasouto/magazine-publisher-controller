import { describe, expect, test } from 'vitest'
import { Advertising } from './advertising'
import { randomUUID } from 'crypto'

describe('Entity Advertising', () => {
  test('should be able to create a advertising', () => {
    const data: any = {
      name: 'test-Advertising',
      categoryAdvertising: 'test-news',
      numberOfPages: 6,
      price: 10.0,
      magazineId: randomUUID(),
    }
    const sut = Advertising.create(data)
    expect(sut.isRight()).toBeTruthy()
  })

  test('should not be able to create a advertising with invalid data', () => {
    const data: any = {}

    const sut = Advertising.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })
})
