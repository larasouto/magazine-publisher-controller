import { beforeAll, describe, expect, test } from 'vitest'
import { UserFactory } from '@/tests/factories/UserFactory'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { User } from '@/application/users/domain/user'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'
import { Coupon } from '../../domain/coupon'
import { InMemoryCouponsRepository } from '../../repositories/in-memory/InMemoryCouponsRepository'
import { ICouponsRepository } from '../../repositories/interfaces/ICouponsRepository'
import { EditCoupon } from './edit-coupon'
import { CouponFactory } from '@/tests/factories/CouponFactory'

let couponsRepository: ICouponsRepository
let editCoupon: EditCoupon
let coupon: Coupon
let usersRepository: IUsersRepository
let user: User

describe('Edit a coupon', () => {
  beforeAll(async () => {
    couponsRepository = new InMemoryCouponsRepository()
    usersRepository = new InMemoryUsersRepository()
    editCoupon = new EditCoupon(couponsRepository, usersRepository)
    user = UserFactory.create()
    await usersRepository.create(user)

    coupon = CouponFactory.create({ userId: user.id })
    await couponsRepository.create(coupon)
  })

  test('should be able to update a coupon', async () => {
    const updatedCoupon = await editCoupon.execute({
      couponId: coupon.id,
      couponCode: 'test-couponCode',
      discountAmount: 10,
      expirationDate: '12/2023',
      maximumAmountOfUse: 1,
      type: 0,
      userId: user.id,
    })

    expect(updatedCoupon.isRight()).toBeTruthy()

    const sub = await couponsRepository.findById(coupon.id)
    expect(sub).toEqual(updatedCoupon.value)
  })

  test('should not be able to update a coupon with invalid data', async () => {
    coupon = CouponFactory.create()

    await couponsRepository.create(coupon)
    expect(await couponsRepository.findById(coupon.id)).toBeTruthy()

    const updatedCoupon = await editCoupon.execute({
      couponId: coupon.id,
      couponCode: '',
      discountAmount: '',
      expirationDate: '',
      maximumAmountOfUse: '',
      type: 0,
      userId: '',
    })

    expect(updatedCoupon.isLeft()).toBeTruthy()
  })
})
