import { beforeEach, describe, expect, test } from 'vitest'
import { CreateOrder } from './create-order'
import { Status } from '../../domain/order.schema'
import { v4 as uuid } from 'uuid'
import { Order } from '../../domain/order'
import { IOrderRepository } from '../../repositories/interfaces/IOrderRepository'
import { InMemoryOrdersRepository } from '../../repositories/in-memory/InMemoryOrderRepository'

let ordersRepository: IOrderRepository
let createOrder: CreateOrder

describe('Create a order', () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository()
    createOrder = new CreateOrder(ordersRepository)
  })

  test('should be able to create a order', async () => {
    const data: any = {
      receiptDate: new Date(),
      departureDate: new Date(),
      status: Status.deliv,
      deliveryAddress: 'order-deliveryAddress',
      exampleNumber: 12,
      price: 12,
      editonId: uuid(),
      graphicsDistributorId: uuid(),
    }

    const response = await createOrder.execute(data)
    const order = response.value as Order

    expect(order).toBeTruthy()
    expect(await ordersRepository.findById(order.id)).toBeTruthy()
  })

  test('should not be able to create a order with empty data', async () => {
    const data: any = {
      receiptDate: null,
      departureDate: null,
      status: null,
      deliveryAddress: '',
      exampleNumber: null,
      price: null,
      editonId: uuid(),
      graphicsDistributorId: uuid(),
    }

    const response = await createOrder.execute(data)
    expect(response.isLeft()).toBeTruthy()
  })
})
