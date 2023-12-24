import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { ICouponsRepository } from '../../repositories/interfaces/ICouponsRepository'
import { PrismaCouponsRepository } from '../../repositories/prisma/PrismaCouponsRepository'
import { EditCoupon } from './edit-coupon'
import { CouponFactory } from '@/tests/factories/CouponFactory'
import { I } from 'vitest/dist/reporters-5f784f42'
import { INotificationsRepository } from '@/application/notifications/repositories/interfaces/INotificationsRepository'

let couponsRepository: ICouponsRepository
let editCoupon: EditCoupon
let notificationsRepository: INotificationsRepository

describe('Edit coupon (end-to-end)', () => {
  const { jwt, user } = UserFactory.createAndAuthenticate()
  const coupon = CouponFactory.create()

  beforeAll(async () => {
    couponsRepository = new PrismaCouponsRepository(notificationsRepository)
    editCoupon = new EditCoupon(couponsRepository)
    await couponsRepository.create(coupon, user.id)
  })

  afterAll(async () => {
    await prismaClient.coupon.deleteMany({
      where: { coupon_code: { contains: 'test' } },
    })
    await prismaClient.user.deleteMany({
      where: { id: user.id },
    })
  })

  test('should be able to update a coupon', async () => {
    const updatedCoupon: any = {
      couponId: coupon.id,
      couponCode: 'test-coupon-code',
      discountAmount: 10,
      expirationDate: '12/2023',
      type: 0,
    }

    const response = await request(app)
      .put(`/api/coupons/${coupon.id}/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(updatedCoupon)

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body).toHaveProperty('message')
  })

  test('should not be able to update a coupon with empty data', async () => {
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
      couponCode: 'test-coupon-code',
      discountAmount: 10,
      expirationDate: '12/2023',
      type: 0,
    }

    const response = await request(app)
      .put(`/api/coupons/invalid-id/edit`)
      .auth(jwt.token, { type: 'bearer' })
      .send(updatedCoupon)

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toHaveProperty('message')
  })
})
