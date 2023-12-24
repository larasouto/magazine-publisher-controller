import { PrismaCouponsRepository } from '@/application/coupons/repositories/prisma/PrismaCouponsRepository'
import { CreateCoupon } from '@/application/coupons/use-cases/create-coupon/create-coupon'
import { CreateCouponController } from '@/application/coupons/use-cases/create-coupon/create-coupon.controller'
import { PrismaNotificationsRepository } from '@/application/notifications/repositories/prisma/PrismaNotificationsRepository'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeCreateCouponsController(): Controller {
  const prismaNotificationsRepository = new PrismaNotificationsRepository()

  const prismaCouponsRepository = new PrismaCouponsRepository(
    prismaNotificationsRepository,
  )

  const useCaseCreateCoupon = new CreateCoupon(prismaCouponsRepository)

  const validator = new ValidatorCompositor([])

  return new CreateCouponController(validator, useCaseCreateCoupon)
}
