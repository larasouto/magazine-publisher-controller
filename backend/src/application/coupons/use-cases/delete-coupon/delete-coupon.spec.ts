import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryCouponsRepository } from '../../repositories/in-memory/InMemoryCouponsRepository'
import { ICouponsRepository } from '../../repositories/interfaces/ICouponsRepository'
import { DeleteCoupon } from './delete-coupon'
import { CouponFactory } from '@/tests/factories/CouponFactory'

let categoriesRepository: ICouponsRepository
let deleteCoupon: DeleteCoupon

describe('Delete coupon', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCouponsRepository()
    deleteCoupon = new DeleteCoupon(categoriesRepository)
  })

  test('should delete a coupon', async () => {
    const coupon1 = CouponFactory.create()
    const coupon2 = CouponFactory.create()

    await categoriesRepository.create(coupon1)
    await categoriesRepository.create(coupon2)

    const response = await deleteCoupon.execute({
      ids: [coupon1.id, coupon2.id],
    })

    expect(response.isRight()).toBeTruthy()
    expect(await categoriesRepository.list()).toStrictEqual([])
  })

  test('should not delete a non-existing coupon', async () => {
    const coupon1 = CouponFactory.create()
    await categoriesRepository.create(coupon1)

    const response = await deleteCoupon.execute({
      ids: [coupon1.id, 'non-existing-id'],
    })

    expect(response.isLeft()).toBeTruthy()
    expect(await categoriesRepository.list()).toStrictEqual([coupon1])
  })
})
