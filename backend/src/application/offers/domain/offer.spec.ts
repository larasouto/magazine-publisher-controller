import { v4 as uuid } from 'uuid'
import { describe, expect, test } from 'vitest'
import { Offer } from './offer'

describe('Entity Offer', () => {
  test('should be able to create a offer', async () => {
    const data: any = {
      discountPercentage: 10,
      dates: {
        from: new Date(),
        to: new Date(),
      },
      editionOffers: [uuid(), uuid()],
    }

    const sut = Offer.create(data)
    expect(sut.isRight()).toBeTruthy()
  })

  test('should not be able to create a offer with invalid data', () => {
    const data: any = {
      discountPercentage: 0,
      dates: {
        from: new Date(),
        to: new Date(),
      },
      editionOffers: [],
    }

    const sut = Offer.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })
})
