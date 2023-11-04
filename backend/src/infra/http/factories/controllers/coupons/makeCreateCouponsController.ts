import { PrismaCouponsRepository } from '@/application/coupons/repositories/prisma/PrismaCouponsRepository'
import { CreateCoupon } from '@/application/coupons/use-cases/create-coupon/create-coupon'
import { CreateCouponController } from '@/application/coupons/use-cases/create-coupon/create-coupon.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeCreateCouponsController(): Controller {
  const prismaCouponsRepository = new PrismaCouponsRepository()

  const useCaseCreateCoupon = new CreateCoupon(prismaCouponsRepository)

  const validator = new ValidatorCompositor([])

  return new CreateCouponController(validator, useCaseCreateCoupon)
}
