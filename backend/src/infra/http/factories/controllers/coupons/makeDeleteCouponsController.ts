import { PrismaCouponsRepository } from '@/application/coupons/repositories/prisma/PrismaCouponsRepository'
import { DeleteCoupon } from '@/application/coupons/use-cases/delete-coupon/delete-coupon'
import { DeleteCouponController } from '@/application/coupons/use-cases/delete-coupon/delete-coupon.controller'
import { PrismaNotificationsRepository } from '@/application/notifications/repositories/prisma/PrismaNotificationsRepository'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeDeleteCouponsController(): Controller {
  const prismaNotificationsRepository = new PrismaNotificationsRepository()
  const prismaCouponsRepository = new PrismaCouponsRepository(
    prismaNotificationsRepository,
  )
  const useCaseDeleteCoupon = new DeleteCoupon(prismaCouponsRepository)

  const validator = new ValidatorCompositor([])

  return new DeleteCouponController(validator, useCaseDeleteCoupon)
}
