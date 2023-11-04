import { beforeEach, describe, expect, test } from 'vitest'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'
import { UserFactory } from '@/tests/factories/UserFactory'
import { Coupon } from '../../domain/coupon'
import { InMemoryCouponsRepository } from '../../repositories/in-memory/InMemoryCouponsRepository'
import { ICouponsRepository } from '../../repositories/interfaces/ICouponsRepository'
import { CreateCoupon } from './create-coupon'

let couponsRepository: ICouponsRepository
let createCoupon: CreateCoupon
let usersRepository: IUsersRepository

describe('Create a coupon', () => {
  beforeEach(() => {
    couponsRepository = new InMemoryCouponsRepository()
    usersRepository = new InMemoryUsersRepository()
    createCoupon = new CreateCoupon(couponsRepository, usersRepository)
  })

  test('should be able to create a coupon', async () => {
    const user = UserFactory.create()
    await usersRepository.create(user)

    const data: any = {
      couponCode: 'test-couponCode',
      discountAmount: 10,
      expirationDate: '12/2023',
      maximumAmountOfUse: 1,
      type: 0,
      userId: user.id,
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
