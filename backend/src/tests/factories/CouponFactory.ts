import { Coupon } from '@/application/coupons/domain/coupon'

type CouponOverrides = {
  couponCode?: string
  discountAmount?: number
  expirationDate?: Date
  availableQuantity?: number
  type?: number
}

export class CouponFactory {
  static create(overrides?: CouponOverrides) {
    const coupon = Coupon.create({
      couponCode: 'test-coupon',
      discountAmount: 15,
      expirationDate: new Date(),
      availableQuantity: 2,
      type: 0,
      ...overrides,
    })

    return coupon.value as Coupon
  }
}
