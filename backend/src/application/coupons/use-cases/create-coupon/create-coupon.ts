import { Either, left, right } from '@/core/logic/either'
import { Coupon } from '../../domain/coupon'
import { ICouponsRepository } from '../../repositories/interfaces/ICouponsRepository'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'

type CreateCouponRequest = {
  couponCode: string
  discountAmount: number
  expirationDate: Date
  type: number
  userId: string
  sendNotification: boolean
}

type CreateCouponResponse = Either<Error, Coupon>

export class CreateCoupon {
  constructor(private couponsRepository: ICouponsRepository) {}

  async execute(request: CreateCouponRequest): Promise<CreateCouponResponse> {
    const couponOrError = Coupon.create(request)

    if (couponOrError.isLeft()) {
      return left(couponOrError.value)
    }

    const coupon = couponOrError.value
    await this.couponsRepository.create(coupon, request.userId)

    return right(coupon)
  }
}
