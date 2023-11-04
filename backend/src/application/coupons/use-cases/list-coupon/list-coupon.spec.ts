import { beforeEach, describe, expect, test } from 'vitest'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'
import { UserFactory } from '@/tests/factories/UserFactory'
import { Coupon } from '../../domain/coupon'
import { InMemoryCouponsRepository } from '../../repositories/in-memory/InMemoryCouponsRepository'
import { ICouponsRepository } from '../../repositories/interfaces/ICouponsRepository'
import { CreateCoupon } from '../create-coupon/create-coupon'
import { ListCoupons } from './list-coupon'

let listCoupons: ListCoupons
let createCoupon: CreateCoupon
let couponsRepository: ICouponsRepository
let usersRepository: IUsersRepository

describe('List coupons', () => {
  beforeEach(() => {
    couponsRepository = new InMemoryCouponsRepository()
    usersRepository = new InMemoryUsersRepository()
    listCoupons = new ListCoupons(couponsRepository)
    createCoupon = new CreateCoupon(couponsRepository, usersRepository)
  })

  test('should list all coupons', async () => {
    const user = UserFactory.create()
    await usersRepository.create(user)

    const data1 = {
      couponCode: 'test-couponCode',
      discountAmount: 10,
      expirationDate: '12/2023',
      maximumAmountOfUse: 1,
      type: 0,
      userId: user.id,
    }

    const data2 = {
      couponCode: 'test-couponCode2',
      discountAmount: 10,
      expirationDate: '12/2023',
      maximumAmountOfUse: 1,
      type: 0,
      userId: user.id,
    }

    const response1 = await createCoupon.execute(data1)
    const coupon1 = response1.value as Coupon

    const response2 = await createCoupon.execute(data2)
    const coupon2 = response2.value as Coupon

    expect(coupon1).toBeTruthy()
    expect(await couponsRepository.findById(coupon1.id)).toBeTruthy()

    expect(coupon2).toBeTruthy()
    expect(await couponsRepository.findById(coupon2.id)).toBeTruthy()

    const response = await listCoupons.execute()
    expect(response.length).toBe(2)

    expect(response[0].props.couponCode).toBe(coupon1.props.couponCode)
    expect(response[1].props.couponCode).toBe(coupon2.props.couponCode)
  })

  test('should return an empty list if no coupons exist', async () => {
    const response = await listCoupons.execute()
    expect(response.length).toBe(0)
  })
})
