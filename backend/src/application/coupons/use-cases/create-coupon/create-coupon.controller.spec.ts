import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { ICouponsRepository } from '../../repositories/interfaces/ICouponsRepository'
import { PrismaCouponsRepository } from '../../repositories/prisma/PrismaCouponsRepository'
import { UserFactory } from '@/tests/factories/UserFactory'

let couponsRepository: ICouponsRepository

describe('Create coupon (end-to-end)', () => {
  beforeAll(async () => {
    couponsRepository = new PrismaCouponsRepository()
  })

  afterAll(async () => {
    await prismaClient.coupon.deleteMany({
      where: { coupon_code: { contains: 'test' } },
    })
  })

  test('should be able to create a coupon', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()
    const data: any = {
      couponCode: 'test-couponCode',
      discountAmount: 10,
      expirationDate: '01/12/2023',
      availableQuantity: 1,
      type: 0,
    }

    const response = await request(app)
      .post('/api/coupons/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)
    console.log(response.body)
    expect(response.status).toBe(StatusCodes.CREATED)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to create a coupon with empty data', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()
    const data: any = {}

    const response = await request(app)
      .post('/api/coupons/new')
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
