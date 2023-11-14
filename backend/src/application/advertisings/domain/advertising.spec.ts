import { describe, expect, test } from 'vitest'
import { Advertising } from './advertising'
import { v4 as uuid } from 'uuid'
import {
  AdvertisingCategory,
  AdvertisingStatus,
  AdvertisingType,
} from './advertising.schema'

describe('Entity Advertising', () => {
  test('should be able to create an advertising', () => {
    const data: any = {
      imagePath: 'http://test.com',
      title: 'test-advertising',
      category: AdvertisingCategory.BEGINNING,
      type: AdvertisingType.BANNER,
      status: AdvertisingStatus.PENDING,
      price: 2000.0,
      magazineId: uuid(),
      userId: uuid(),
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
