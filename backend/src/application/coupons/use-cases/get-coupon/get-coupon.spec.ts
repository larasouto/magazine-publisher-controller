import { beforeAll, describe, expect, test } from 'vitest'
import { InMemoryCouponsRepository } from '../../repositories/in-memory/InMemoryCouponsRepository'
import { ICouponsRepository } from '../../repositories/interfaces/ICouponsRepository'
import { GetCoupon } from './get-coupon'
import { CouponFactory } from '@/tests/factories/CouponFactory'

let couponsRepository: ICouponsRepository
let getCoupon: GetCoupon

describe('Get a coupon', () => {
  const coupon = CouponFactory.create()

  beforeAll(async () => {
    couponsRepository = new InMemoryCouponsRepository()
    getCoupon = new GetCoupon(couponsRepository)
    await couponsRepository.create(coupon)
  })

  test('should be able to get a coupon', async () => {
    const _coupon = await getCoupon.execute({ couponId: coupon.id })

    expect(_coupon.isRight()).toBeTruthy()
  })

  test('should not be able to get a non existing coupon', async () => {
    const coupon = await getCoupon.execute({ couponId: 'random-id' })

    expect(coupon.isLeft()).toBeTruthy()
  })
})
