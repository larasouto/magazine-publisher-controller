import { Either, left, right } from '@/core/logic/either'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { Coupon } from '../../domain/coupon'
import { ICouponsRepository } from '../../repositories/interfaces/ICouponsRepository'
import { CouponNotFoundError } from './errors/CouponNotFoundError'

type GetCouponRequest = {
  couponId: string
  userId: string
}

type GetCouponResponse = Either<CouponNotFoundError, Coupon>

export class GetCoupon {
  constructor(
    private couponsRepository: ICouponsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    couponId,
    userId,
  }: GetCouponRequest): Promise<GetCouponResponse> {
    const coupon = await this.couponsRepository.findById(couponId)

    if (!coupon) {
      return left(new CouponNotFoundError())
    }

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new CouponNotFoundError())
    }

    return right(coupon)
  }
}
