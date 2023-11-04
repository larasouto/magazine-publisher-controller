import { PrismaCouponsRepository } from '@/application/coupons/repositories/prisma/PrismaCouponsRepository'
import { GetCoupon } from '@/application/coupons/use-cases/get-coupon/get-coupon'
import { GetCouponController } from '@/application/coupons/use-cases/get-coupon/get-coupon.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeGetCouponController(): Controller {
  const prismaCouponsRepository = new PrismaCouponsRepository()

  const useCaseGetCoupon = new GetCoupon(prismaCouponsRepository)

  const validator = new ValidatorCompositor([])

  return new GetCouponController(validator, useCaseGetCoupon)
}
