import { Either, left, right } from '@/core/logic/either'
import { ICouponsRepository } from '../../repositories/interfaces/ICouponsRepository'
import { CouponNotFoundError } from './errors/CouponNotFoundError'
import { OneOrMoreCouponNotFoundError } from './errors/OneOrMoreCouponNotFoundError'

type DeleteCouponRequest = {
  ids: string[]
}

type DeleteCouponResponse = Either<CouponNotFoundError, null>

export class DeleteCoupon {
  constructor(private couponsRepository: ICouponsRepository) {}

  async execute({
    ids: couponId,
  }: DeleteCouponRequest): Promise<DeleteCouponResponse> {
    const couponOrCoupons = Array.isArray(couponId) ? couponId : [couponId]

    if (couponOrCoupons.length === 0) {
      return left(new CouponNotFoundError())
    }
    const couponPromises = couponOrCoupons
      .filter((couponId) => couponId)
      .map((couponId) => this.couponsRepository.findById(couponId))

    const coupons = await Promise.all(couponPromises)

    if (coupons.some((coupon) => coupon === null)) {
      return left(
        coupons.length > 1
          ? new OneOrMoreCouponNotFoundError()
          : new CouponNotFoundError(),
      )
    }

    await this.couponsRepository.deleteMany(couponOrCoupons)

    return right(null)
  }
}
