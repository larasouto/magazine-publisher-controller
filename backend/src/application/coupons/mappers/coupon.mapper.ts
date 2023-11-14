import { Coupon as PersistenceCoupon } from '@prisma/client'
import { MapperError } from '@/core/errors/MapperErrors'
import { Coupon } from '../domain/coupon'

export class CouponMapper {
  static toDomain(raw: PersistenceCoupon) {
    const couponOrError = Coupon.create(
      {
        couponCode: raw.coupon_code,
        discountAmount: raw.discount_amount,
        expirationDate: raw.expiration_date,
        availableQuantity: raw.available_quantity,
        type: raw.type,
      },
      raw.id,
    )

    if (couponOrError.isLeft()) {
      throw new MapperError(couponOrError.value.message)
    }

    return couponOrError.value
  }

  static async toPersistence(coupon: Coupon) {
    return {
      id: coupon.id,
      coupon_code: coupon.props.couponCode,
      discount_amount: coupon.props.discountAmount,
      expiration_date: coupon.props.expirationDate,
      available_quantity: coupon.props.availableQuantity,
      type: coupon.props.type,
    }
  }
}
