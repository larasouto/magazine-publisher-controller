import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { ICouponsRepository } from '../../repositories/interfaces/ICouponsRepository'
import { PrismaCouponsRepository } from '../../repositories/prisma/PrismaCouponsRepository'

let couponsRepository: ICouponsRepository
let usersRepository: IUsersRepository

describe('Create coupon (end-to-end)', () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()

  beforeAll(async () => {
    couponsRepository = new PrismaCouponsRepository()
    usersRepository = new PrismaUsersRepository()
    await usersRepository.create(user)
  })

  afterAll(async () => {
    await prismaClient.coupon.deleteMany({
      where: { couponCode: { contains: 'test' } },
    })
    await prismaClient.user.deleteMany({
      where: { id: user.id },
    })
  })

  test('should be able to create a coupon', async () => {
    const data: any = {
      couponCode: 'test-couponCode',
      discountAmount: 10,
      expirationDate: '12/2023',
      maximumAmountOfUse: 1,
      type: 0,
      userId: user.id,
    }

    const response = await request(app)
      .post('/api/coupons/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to create a coupon with empty data', async () => {
    const data: any = {}

    const response = await request(app)
      .post('/api/coupons/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
