import { Either, left, right } from '@/core/logic/either'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { UserNotFoundError } from './errors/UserNotFoundErrors'
import { Coupon } from '../../domain/coupon'
import { ICouponsRepository } from '../../repositories/interfaces/ICouponsRepository'
import { CouponNotFoundError } from './errors/CouponNotFoundError'

type EditCouponRequest = {
  couponId: string
  couponCode: string
  discountAmount: number
  expirationDate: string
  maximumAmountOfUse: number
  type: number
  userId: string
}

type EditCouponResponse = Either<CouponNotFoundError, Coupon>

export class EditCoupon {
  constructor(
    private couponsRepository: ICouponsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    couponId,
    ...request
  }: EditCouponRequest): Promise<EditCouponResponse> {
    const couponOrError = Coupon.create(request, couponId)

    if (couponOrError.isLeft()) {
      return left(couponOrError.value)
    }

    const userExists = await this.usersRepository.findById(request.userId)

    if (!userExists) {
      return left(new UserNotFoundError())
    }

    const couponExists = await this.couponsRepository.findById(couponId)

    if (!couponExists) {
      return left(new CouponNotFoundError())
    }

    const coupon = couponOrError.value
    await this.couponsRepository.update(coupon)

    return right(coupon)
  }
}
