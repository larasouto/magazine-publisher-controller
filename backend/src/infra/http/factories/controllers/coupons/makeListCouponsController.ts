import { PrismaCouponsRepository } from '@/application/coupons/repositories/prisma/PrismaCouponsRepository'
import { ListCoupons } from '@/application/coupons/use-cases/list-coupon/list-coupon'
import { ListCouponController } from '@/application/coupons/use-cases/list-coupon/list-coupon.controller'
import { PrismaNotificationsRepository } from '@/application/notifications/repositories/prisma/PrismaNotificationsRepository'
import { Controller } from '@/core/infra/controller'

export function makeListCouponsController(): Controller {
  const prismaNotificationsRepository = new PrismaNotificationsRepository()
  const prismaCouponsRepository = new PrismaCouponsRepository(
    prismaNotificationsRepository,
  )
  const useCaseListCoupon = new ListCoupons(prismaCouponsRepository)

  return new ListCouponController(useCaseListCoupon)
}
