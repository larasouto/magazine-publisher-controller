import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { GraphicsOrder } from '@prisma/client'
import { IGraphicsOrderRepository } from '../../repositories/interfaces/IGraphicsOrderRepository'
import { ListGraphicsOrder } from './list-graphicsOrder'
import { CreateGraphicsOrder } from '../create-order/create-graphicsOrder'
import { InMemoryGraphicsOrdersRepository } from '../../repositories/in-memory/InMemoryGraphicsOrderrRepository'
import { Status } from '../../domain/graphicsOrder.schema'

let listGraphicsOrder: ListGraphicsOrder
let createGraphicsOrder: CreateGraphicsOrder
let orderRepository: IGraphicsOrderRepository

describe('List order', () => {
  beforeEach(() => {
    orderRepository = new InMemoryGraphicsOrdersRepository()
    listGraphicsOrder = new ListGraphicsOrder(orderRepository)
    createGraphicsOrder = new CreateGraphicsOrder(orderRepository)
  })

  test('should list all order', async () => {
    const data1 = {
      receiptDate: new Date(),
      departureDate: new Date(),
      status: Status.deliv,
      deliveryAddress: 'order-deliveryAddress2',
      exampleNumber: 12,
      price: 12,
      editionId: uuid(),
      graphicsDistributorId: uuid(),
      bookstoreId: uuid(),
    }

    const data2 = {
      receiptDate: new Date(),
      departureDate: new Date(),
      status: Status.deliv,
      deliveryAddress: 'order-deliveryAddress',
      exampleNumber: 12,
      price: 12,
      editionId: uuid(),
      graphicsDistributorId: uuid(),
      bookstoreId: uuid(),
    }

    const response1 = await createGraphicsOrder.execute(data1)
    const order1 = response1.value as unknown as GraphicsOrder
    const response2 = await createGraphicsOrder.execute(data2)
    const order2 = response2.value as unknown as GraphicsOrder

    expect(order1).toBeTruthy()
    expect(await orderRepository.findById(order1.id)).toBeTruthy()

    expect(order2).toBeTruthy()
    expect(await orderRepository.findById(order2.id)).toBeTruthy()

    const response = await listGraphicsOrder.execute()
    expect(response.length).toBe(2)

    expect(response[0]).toBe(order1)
    expect(response[1]).toBe(order2)
  })

  test('should return an empty list if no order exist', async () => {
    const response = await listGraphicsOrder.execute()
    expect(response.length).toBe(0)
  })
})
