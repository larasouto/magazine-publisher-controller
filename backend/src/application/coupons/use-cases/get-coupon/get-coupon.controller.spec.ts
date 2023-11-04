import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { PrismaCouponsRepository } from '../../repositories/prisma/PrismaCouponsRepository'
import { ICouponsRepository } from '../../repositories/interfaces/ICouponsRepository'
import { Coupon } from '../../domain/coupon'
import { CouponFactory } from '@/tests/factories/CouponFactory'

let couponsRepository: ICouponsRepository
let usersRepository: IUsersRepository
let coupon: Coupon

describe('Get a coupon (end-to-end)', () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()

  beforeAll(async () => {
    couponsRepository = new PrismaCouponsRepository()
    usersRepository = new PrismaUsersRepository()
    await usersRepository.create(user)

    coupon = CouponFactory.create({ userId: user.id })
    await couponsRepository.create(coupon)
  })

  afterAll(async () => {
    await prismaClient.coupon.deleteMany({
      where: { id: coupon.id },
    })
    await prismaClient.user.deleteMany({
      where: { id: user.id },
    })
  })

  test('should be able to get a coupon', async () => {
    const response = await request(app)
      .get(`/api/coupons/${coupon.id}`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.OK)
  })

  test('should not be able to get a non existing coupon', async () => {
    const response = await request(app)
      .get(`/api/coupons/${coupon.id}-complement`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })

  test('should not be able to get a coupon with no authentication', async () => {
    const response = await request(app).get(`/api/coupons/${coupon.id}`).send()

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
  })

  test('should not be able to get a coupon with invalid couponId', async () => {
    const response = await request(app)
      .get(`/api/coupons/${null}`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })
})
