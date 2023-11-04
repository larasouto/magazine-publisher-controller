import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { PrismaCouponsRepository } from '../../repositories/prisma/PrismaCouponsRepository'
import { ICouponsRepository } from '../../repositories/interfaces/ICouponsRepository'

let couponsRepository: ICouponsRepository
let usersRepository: IUsersRepository

let couponId: string[] = []

describe('List coupons (end-to-end)', () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()

  beforeAll(async () => {
    couponsRepository = new PrismaCouponsRepository()
    usersRepository = new PrismaUsersRepository()
    await usersRepository.create(user)
  })

  afterAll(async () => {
    await prismaClient.coupon.deleteMany({
      where: { id: { in: couponId } },
    })
    await prismaClient.user.deleteMany({
      where: { id: user.id },
    })
  })

  test('should list all coupons', async () => {
    const data: any = {
      id: uuid(),
      couponCode: 'test-couponCode',
      discountAmount: 10,
      expirationDate: '12/2023',
      maximumAmountOfUse: 1,
      type: 0,
      userId: user.id,
    }

    await prismaClient.coupon.create({
      data,
    })
    couponId.push(data.id)

    const response = await request(app)
      .get('/api/coupons')
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)

    const coupons = await couponsRepository.list()
    expect(coupons.length > 0).toBeTruthy()
  })
})
