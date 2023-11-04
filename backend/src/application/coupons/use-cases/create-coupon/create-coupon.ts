import { Either, left, right } from '@/core/logic/either'
import { number } from 'zod'
import { User } from '@/application/users/domain/user'
import { UserNotFoundError } from './errors/UserNotFoundError'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { Coupon } from '../../domain/coupon'
import { ICouponsRepository } from '../../repositories/interfaces/ICouponsRepository'

type CreateCouponRequest = {
  couponCode: string
  discountAmount: number
  expirationDate: string
  maximumAmountOfUse: number
  type: number
  userId: string
}

type CreateCouponResponse = Either<Error, Coupon>

export class CreateCoupon {
  constructor(
    private couponsRepository: ICouponsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute(request: CreateCouponRequest): Promise<CreateCouponResponse> {
    const couponOrError = Coupon.create(request)

    if (couponOrError.isLeft()) {
      return left(couponOrError.value)
    }

    const userExists = await this.usersRepository.findById(request.userId)

    if (!userExists) {
      return left(new UserNotFoundError())
    }

    const coupon = couponOrError.value
    await this.couponsRepository.create(coupon)

    return right(coupon)
  }
}
