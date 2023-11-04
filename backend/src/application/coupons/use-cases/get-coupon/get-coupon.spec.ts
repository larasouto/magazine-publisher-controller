
import { v4 as uuid } from 'uuid'
import { beforeAll, describe, expect, test } from 'vitest'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'
import { User } from '@/application/users/domain/user'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { UserFactory } from '@/tests/factories/UserFactory'
import { InMemoryCouponsRepository } from '../../repositories/in-memory/InMemoryCouponsRepository'
import { ICouponsRepository } from '../../repositories/interfaces/ICouponsRepository'
import { GetCoupon } from './get-coupon'
import { CouponFactory } from '@/tests/factories/CouponFactory'


let couponsRepository: ICouponsRepository
let getCoupon: GetCoupon
let usersRepository: IUsersRepository

describe('Get a coupon', () => {
  const user = UserFactory.create()
  const coupon = CouponFactory.create({ userId: user.id })

  beforeAll(async () => {
    couponsRepository = new InMemoryCouponsRepository()
    usersRepository = new InMemoryUsersRepository()
    getCoupon = new GetCoupon(couponsRepository, usersRepository)
    await usersRepository.create(user)
    await couponsRepository.create(coupon)
  })

  test('should be able to get a coupon', async () => {
    const _coupon = await getCoupon.execute({ couponId: coupon.id, userId: user.id })

    expect(_coupon.isRight()).toBeTruthy()
  })

  test('should not be able to get a non existing coupon', async () => {
    const coupon = await getCoupon.execute({ couponId: 'random-id', userId: user.id })

    expect(coupon.isLeft()).toBeTruthy()
  })

  test('should not be able to get a coupon with non existing user', async () => {
    const _coupon = await getCoupon.execute({
      couponId: coupon.id,
      userId: 'random-id',
    })

    expect(_coupon.isLeft()).toBeTruthy()
  })
})
