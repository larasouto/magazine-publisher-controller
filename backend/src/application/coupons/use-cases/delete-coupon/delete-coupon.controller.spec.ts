import { app } from '@/infra/http/app'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { beforeAll, afterAll, describe, expect, test } from 'vitest'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { prismaClient } from '@/infra/prisma/client'
import { PrismaCouponsRepository } from '../../repositories/prisma/PrismaCouponsRepository'
import { ICouponsRepository } from '../../repositories/interfaces/ICouponsRepository'
import { CouponFactory } from '@/tests/factories/CouponFactory'

let couponsRepository: ICouponsRepository
let usersRepository: IUsersRepository

describe('Delete coupon (end-to-end)', () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()
  const coupons = [
    CouponFactory.create({ userId: user.id }),
    CouponFactory.create({ userId: user.id }),
    CouponFactory.create({ userId: user.id }),
  ]

  beforeAll(async () => {
    couponsRepository = new PrismaCouponsRepository()
    usersRepository = new PrismaUsersRepository()

    await usersRepository.create(user)
    await couponsRepository.create(coupons[0])
    await couponsRepository.create(coupons[1])
    await couponsRepository.create(coupons[2])
  })

  afterAll(async () => {
    await prismaClient.coupon.deleteMany({
      where: { couponCode: { contains: 'test' } },
    })
    await prismaClient.user.deleteMany({
      where: { id: user.id },
    })
  })

  test('should be able to delete an existing coupon', async () => {
    const response = await request(app)
      .del(`/api/coupons/?ids=${coupons[0].id}`)
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

  test('should be able to delete more than one coupon', async () => {
    const response = await request(app)
      .del(`/api/coupons/?ids=${coupons[1].id}&ids=${coupons[2].id}`)
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })
})
