import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { Status } from '../../domain/order.schema'

describe('Get a order (end-to-end)', () => {
  const create = {
    id: uuid(),
    receiptDate: new Date(),
    departureDate: new Date(),
    status: Status.deliv,
    deliveryAddress: 'order-deliveryAddress',
    exampleNumber: 12,
    price: 12,
    editonId: uuid(),
    graphicsDistributorId: uuid(),
  }

  beforeAll(async () => {
    await prismaClient.order.create({
      data: create,
    })
  })

  afterAll(async () => {
    await prismaClient.order.deleteMany({
      where: { id: create.id },
    })
  })

  test('should be able to get a order', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .get(`/api/magazines/order/${create.id}`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.OK)
  })

  test('should not be able to get a non existing order', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .get(`/api/magazines/order/${create.id}-complement`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })

  test('should not be able to get a order with no authentication', async () => {
    const response = await request(app)
      .get(`/api/magazines/orders/${create.id}`)
      .send()

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
  })

  test('should not be able to get a order with invalid orderId', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const response = await request(app)
      .get(`/api/magazines/order/${null}`)
      .auth(jwt.token, { type: 'bearer' })
      .send()

    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })
})
