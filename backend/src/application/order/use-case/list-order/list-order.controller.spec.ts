import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { UserFactory } from '@/tests/factories/UserFactory'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { v4 as uuid } from 'uuid'
import { afterEach, describe, expect, test } from 'vitest'
import { PrismaOrdersRepository } from '../../repositories/prisma/PrismaOrderRepository'
import { Status } from '../../domain/order.schema'

const orderRepository = new PrismaOrdersRepository()

let orderId: string[] = []

describe('List order (end-to-end)', () => {
  afterEach(async () => {
    await prismaClient.order.deleteMany({
      where: { id: { in: orderId } },
    })
  })

  test('should list all order', async () => {
    const { jwt } = UserFactory.createAndAuthenticate()

    const data: any = {
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

    await prismaClient.order.create({
      data,
    })
    orderId.push(data.id)

    const response = await request(app)
      .get('/api/magazines/order')
      .auth(jwt.token, { type: 'bearer' })

    expect(response.status).toBe(StatusCodes.OK)

    const order = await orderRepository.list()
    expect(order.length > 0).toBeTruthy()
  })
})
