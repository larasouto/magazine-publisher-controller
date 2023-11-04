import { beforeAll, describe, expect, test } from 'vitest'
import { UserFactory } from '@/tests/factories/UserFactory'
import { Coupon } from '../../domain/coupon'
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
    await couponsRepository.create(coupon)
  })

  test('should be able to update a coupon', async () => {
    const updatedCoupon = await editCoupon.execute({
      couponId: coupon.id,
      couponCode: 'test-coupon-code',
      discountAmount: 10,
      expirationDate: '12/2023',
      availableQuantity: 1,
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
      expirationDate: '',
      availableQuantity: 0,
      type: 0,
    })

    expect(updatedCoupon.isLeft()).toBeTruthy()
  })
})
