import { Coupon } from '@/application/coupons/domain/coupon'

type CouponOverrides = {
  couponCode: string
  discountAmount: number
  expirationDate: string
  maximumAmountOfUse: number
  type: number
  userId: string
}

export class CouponFactory {
  static create(overrides?: CouponOverrides) {
    const coupon = Coupon.create({
      couponCode: 'test-couponCode3',
      discountAmount: 15,
      expirationDate: '11/2023',
      maximumAmountOfUse: 2,
      type: 0,
      userId: 'test-user-id',
      ...overrides,
    })

    return coupon.value as Coupon
  }
}
