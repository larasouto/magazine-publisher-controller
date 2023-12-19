import { PrismaCouponsRepository } from '@/application/coupons/repositories/prisma/PrismaCouponsRepository'
import { GetCoupon } from '@/application/coupons/use-cases/get-coupon/get-coupon'
import { GetCouponController } from '@/application/coupons/use-cases/get-coupon/get-coupon.controller'
import { PrismaNotificationsRepository } from '@/application/notifications/repositories/prisma/PrismaNotificationsRepository'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeGetCouponController(): Controller {
  const prismaNotificationsRepository = new PrismaNotificationsRepository()
  const prismaCouponsRepository = new PrismaCouponsRepository(
    prismaNotificationsRepository,
  )

  const useCaseGetCoupon = new GetCoupon(prismaCouponsRepository)

  const validator = new ValidatorCompositor([])

  return new GetCouponController(validator, useCaseGetCoupon)
}
