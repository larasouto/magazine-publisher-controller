
import { PrismaCouponsRepository } from '@/application/coupons/repositories/prisma/PrismaCouponsRepository'
import { DeleteCoupon } from '@/application/coupons/use-cases/delete-coupon/delete-coupon'
import { DeleteCouponController } from '@/application/coupons/use-cases/delete-coupon/delete-coupon.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeDeleteCouponsController(): Controller {
  const prismaCouponsRepository = new PrismaCouponsRepository()
  const useCaseDeleteCoupon = new DeleteCoupon(prismaCouponsRepository)

  const validator = new ValidatorCompositor([])

  return new DeleteCouponController(validator, useCaseDeleteCoupon)
}
