import { describe, expect, test } from 'vitest'
import { Advertising } from './advertising'
import { v4 as uuid } from 'uuid'
import { AdvertisingCategory } from './advertising.schema'

describe('Entity Advertising', () => {
  test('should be able to create an advertising', () => {
    const data: any = {
      name: 'test-advertising',
      category: AdvertisingCategory.PREMIUM,
      numberOfPages: 3,
      price: 2000.0,
      magazineId: uuid(),
    }
    const sut = Advertising.create(data)
    expect(sut.isRight()).toBeTruthy()
  })

  test('should not be able to create an advertising with invalid data', () => {
    const data: any = {}

    const sut = Advertising.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })
})
