
import { MapperError } from '@/core/errors/MapperErrors'
import { Coupon } from '../domain/coupon'

export class CouponMapper {
  static toDomain(raw: PersistenceCoupon) {
    const couponOrError = Coupon.create(
      {
        couponCode: raw.coupon_code,
        discountAmount: raw.discount_amount,
        expirationDate: raw.expiration_date,
        maximumAmountOfUse: raw.maximum_amount_of_use,
        type: raw.type,
        userId: raw.user_id,
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
      couponCode: coupon.props.couponCode,
      discountAmount: coupon.props.discountAmount,
      expirationDate: coupon.props.expirationDate,
      maximumAmountOfUse: coupon.props.maximumAmountOfUse,
      type: coupon.props.type,
      userId: coupon.props.userId,
    }
  }
}
