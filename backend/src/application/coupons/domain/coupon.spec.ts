import { describe, expect, test } from 'vitest'
import { Coupon } from './coupon'

describe('Entity Coupon', () => {
  test('should be able to create a coupon', () => {
    const data: any = {
      couponCode: 'test-couponCode',
      discountAmount: 10,
      expirationDate: '01/12/2023',
      availableQuantity: 1,
      type: 0,
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
