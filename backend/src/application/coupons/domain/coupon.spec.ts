import { describe, expect, test } from 'vitest'
import { v4 as uuid } from 'uuid'
import { Coupon } from './coupon'

describe('Entity Coupon', () => {
  test('should be able to create a coupon', () => {
    const data: any = {
      couponCode: 'test-couponCode',
      discountAmount: 10,
      expirationDate: '12/2023',
      maximumAmountOfUse: 1,
      type: 0,
      userId: uuid(),
    }

    const sut = Coupon.create(data)
    expect(sut.isRight()).toBeTruthy()
  })

  test('should not be able to create a coupon with invalid data', () => {
    const data: any = {}

    const sut = Coupon.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })
})
