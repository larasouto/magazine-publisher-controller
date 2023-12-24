import { beforeEach, describe, expect, test } from 'vitest'
import { Coupon } from '../../domain/coupon'
import { InMemoryCouponsRepository } from '../../repositories/in-memory/InMemoryCouponsRepository'
import { ICouponsRepository } from '../../repositories/interfaces/ICouponsRepository'
import { CreateCoupon } from './create-coupon'

let couponsRepository: ICouponsRepository
let createCoupon: CreateCoupon

describe('Create a coupon', () => {
  beforeEach(() => {
    couponsRepository = new InMemoryCouponsRepository()
    createCoupon = new CreateCoupon(couponsRepository)
  })

  test('should be able to create a coupon', async () => {
    const data: any = {
      couponCode: 'test-coupon',
      discountAmount: 10,
      expirationDate: '01/12/2023',
      type: 0,
    }

    const response = await createCoupon.execute(data)
    const coupon = response.value as Coupon

    expect(coupon).toBeTruthy()
    expect(await couponsRepository.findById(coupon.id)).toBeTruthy()
  })

  test('should not be able to create a coupon with empty data', async () => {
    const data: any = {}

    const response = await createCoupon.execute(data)
    expect(response.isLeft()).toBeTruthy()
  })
})
