import { PrismaCouponsRepository } from '@/application/coupons/repositories/prisma/PrismaCouponsRepository'
import { ListCoupons } from '@/application/coupons/use-cases/list-coupon/list-coupon'
import { ListCouponController } from '@/application/coupons/use-cases/list-coupon/list-coupon.controller'
import { Controller } from '@/core/infra/controller'

export function makeListCouponsController(): Controller {
  const prismaCouponsRepository = new PrismaCouponsRepository()
  const useCaseListCoupon = new ListCoupons(prismaCouponsRepository)

  return new ListCouponController(useCaseListCoupon)
}
