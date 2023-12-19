import { PrismaCouponsRepository } from '@/application/coupons/repositories/prisma/PrismaCouponsRepository'
import { EditCoupon } from '@/application/coupons/use-cases/edit-coupon/edit-coupon'
import { EditCouponController } from '@/application/coupons/use-cases/edit-coupon/edit-coupon.controller'
import { PrismaNotificationsRepository } from '@/application/notifications/repositories/prisma/PrismaNotificationsRepository'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeEditCouponsController(): Controller {
  const prismaNotificationsRepository = new PrismaNotificationsRepository()
  const prismaCouponsRepository = new PrismaCouponsRepository(
    prismaNotificationsRepository,
  )

  const useCaseEditCoupon = new EditCoupon(prismaCouponsRepository)

  const validator = new ValidatorCompositor([])

  return new EditCouponController(validator, useCaseEditCoupon)
}
