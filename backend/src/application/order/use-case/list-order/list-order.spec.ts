import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryOrdersRepository } from '../../repositories/in-memory/InMemoryOrderRepository'
import { CreateOrder } from '../create-order/create-order'
import { ListOrder } from './list-order'
import { Status } from '../../domain/order.schema'
import { Order } from '@prisma/client'
import { IOrderRepository } from '../../repositories/interfaces/IOrderRepository'

let listOrder: ListOrder
let createOrder: CreateOrder
let orderRepository: IOrderRepository

describe('List order', () => {
  beforeEach(() => {
    orderRepository = new InMemoryOrdersRepository()
    listOrder = new ListOrder(orderRepository)
    createOrder = new CreateOrder(orderRepository)
  })

  test('should list all order', async () => {
    const data1 = {
      receiptDate: new Date(),
      departureDate: new Date(),
      status: Status.deliv,
      deliveryAddress: 'order-deliveryAddress',
      exampleNumber: 12,
      price: 12,
      editonId: uuid(),
      graphicsDistributorId: uuid(),
    }

    const data2 = {
      receiptDate: new Date(),
      departureDate: new Date(),
      status: Status.deliv,
      deliveryAddress: 'order-deliveryAddress2',
      exampleNumber: 122,
      price: 122,
      editonId: uuid(),
      graphicsDistributorId: uuid(),
    }

    const response1 = await createOrder.execute(data1)
    const order1 = response1.value as unknown as Order
    const response2 = await createOrder.execute(data2)
    const order2 = response2.value as unknown as Order

    expect(order1).toBeTruthy()
    expect(await orderRepository.findById(order1.id)).toBeTruthy()

    expect(order2).toBeTruthy()
    expect(await orderRepository.findById(order2.id)).toBeTruthy()

    const response = await listOrder.execute()
    expect(response.length).toBe(2)

    expect(response[0]).toBe(order1)
    expect(response[1]).toBe(order2)
  })

  test('should return an empty list if no order exist', async () => {
    const response = await listOrder.execute()
    expect(response.length).toBe(0)
  })
})