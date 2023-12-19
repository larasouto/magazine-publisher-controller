import { Either, left, right } from '@/core/logic/either'
import { Coupon } from '../../domain/coupon'
import { ICouponsRepository } from '../../repositories/interfaces/ICouponsRepository'
import { CouponNotFoundError } from './errors/CouponNotFoundError'

type GetCouponRequest = {
  couponId: string
}

type GetCouponResponse = Either<CouponNotFoundError, Coupon>

export class GetCoupon {
  constructor(private couponsRepository: ICouponsRepository) {}

  async execute({ couponId }: GetCouponRequest): Promise<GetCouponResponse> {
    const coupon = await this.couponsRepository.findById(couponId)

    if (!coupon) {
      return left(new CouponNotFoundError())
    }

    return right(coupon)
  }
}
