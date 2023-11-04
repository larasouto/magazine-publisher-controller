import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { v4 as uuid } from 'uuid'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { Coupon } from '../../domain/coupon'
import { ICouponsRepository } from '../../repositories/interfaces/ICouponsRepository'
import { PrismaCouponsRepository } from '../../repositories/prisma/PrismaCouponsRepository'
import { EditCoupon } from './edit-coupon'
import { CouponFactory } from '@/tests/factories/CouponFactory'

let couponsRepository: ICouponsRepository
let editCoupon: EditCoupon
let coupon: Coupon
let usersRepository: IUsersRepository

describe('Edit coupon (end-to-end)', () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()

  beforeAll(async () => {
    couponsRepository = new PrismaCouponsRepository()
    usersRepository = new PrismaUsersRepository()
    editCoupon = new EditCoupon(couponsRepository, usersRepository)
    coupon = CouponFactory.create({ userId: user.id })
    await usersRepository.create(user)
    await couponsRepository.create(coupon)
  })

  afterAll(async () => {
    await prismaClient.coupon.deleteMany({
      where: { couponCode: { contains: 'test' } },
    })
    await prismaClient.user.deleteMany({
      where: { id: user.id },
    })
  })

  test('should be able to update a coupon', async () => {
    const updatedCoupon: any = {
      couponId: coupon.id,
      couponCode: 'test-couponCode',
      discountAmount: 10,
      expirationDate: '12/2023',
      maximumAmountOfUse: 1,
      type: 0,
      userId: user.id,
    }

    const response = await request(app)
      .put(`/api/coupons/${coupon.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(updatedCoupon)

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to updated a coupon with empty data', async () => {
    const data: any = {}

    const response = await request(app)
      .put(`/api/coupons/${coupon.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to update a coupon with invalid id', async () => {
    const updatedCoupon: any = {
      couponId: coupon.id,
      couponCode: 'test-couponCode',
      discountAmount: 10,
      expirationDate: '12/2023',
      maximumAmountOfUse: 1,
      type: 0,
      userId: user.id,
    }

    const response = await request(app)
      .put(`/api/coupons/invalid-id/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(updatedCoupon)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
