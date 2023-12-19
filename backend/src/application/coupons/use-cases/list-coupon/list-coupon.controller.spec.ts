import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { PrismaCouponsRepository } from '../../repositories/prisma/PrismaCouponsRepository'
import { ICouponsRepository } from '../../repositories/interfaces/ICouponsRepository'

let couponsRepository: ICouponsRepository

let couponId: string[] = []

describe('List coupons (end-to-end)', () => {
  const { jwt } = UserFactory.createAndAuthenticate()

  beforeAll(async () => {
    couponsRepository = new PrismaCouponsRepository()
  })

  afterAll(async () => {
    await prismaClient.coupon.deleteMany({
      where: { id: { in: couponId } },
    })
  })

  test('should list all coupons', async () => {
    const data: any = {
      id: uuid(),
      couponCode: 'test-couponCode',
      discountAmount: 10,
      expirationDate: '01/12/2023',
      availableQuantity: 1,
      type: 0,
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
