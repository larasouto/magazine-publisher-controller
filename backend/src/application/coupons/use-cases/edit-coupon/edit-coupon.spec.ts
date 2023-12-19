import { beforeAll, describe, expect, test } from 'vitest'
import { InMemoryCouponsRepository } from '../../repositories/in-memory/InMemoryCouponsRepository'
import { ICouponsRepository } from '../../repositories/interfaces/ICouponsRepository'
import { EditCoupon } from './edit-coupon'
import { CouponFactory } from '@/tests/factories/CouponFactory'

let couponsRepository: ICouponsRepository
let editCoupon: EditCoupon

describe('Edit a coupon', () => {
  const coupon = CouponFactory.create()
  beforeAll(async () => {
    couponsRepository = new InMemoryCouponsRepository()
    editCoupon = new EditCoupon(couponsRepository)
    await couponsRepository.create(coupon, 'user-id')
  })

  test('should be able to update a coupon', async () => {
    const updatedCoupon = await editCoupon.execute({
      couponId: coupon.id,
      couponCode: 'test-coupon-code',
      discountAmount: 10,
      expirationDate: new Date(),
      type: 0,
    })

    expect(updatedCoupon.isRight()).toBeTruthy()

    const sub = await couponsRepository.findById(coupon.id)
    expect(sub).toEqual(updatedCoupon.value)
  })

  test('should not be able to update a coupon with invalid data', async () => {
    expect(await couponsRepository.findById(coupon.id)).toBeTruthy()

    const updatedCoupon = await editCoupon.execute({
      couponId: coupon.id,
      couponCode: '',
      discountAmount: 0,
      expirationDate: new Date(),
      type: 0,
    })

    expect(updatedCoupon.isLeft()).toBeTruthy()
  })
})
