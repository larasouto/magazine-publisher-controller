import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { IOrderRepository } from '../../repositories/interfaces/IOrderRepository'
import { GetOrder } from './get-order'
import { InMemoryOrdersRepository } from '../../repositories/in-memory/InMemoryThemesRepository'
import { Status } from '../../domain/order.schema'

let ordersRepository: IOrderRepository
let getOrderGetOrder: GetOrder

describe('Get a order', () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository()
    getOrderGetOrder = new GetOrder(ordersRepository)
  })

  test('should be able to get a order', async () => {
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

    await ordersRepository.create(data)
    const order = await getOrderGetOrder.execute({
      orderId: data.id,
    })

    expect(order.isRight()).toBeTruthy()
  })

  test('should not be able to get a non existing order', async () => {
    const order = await getOrderGetOrder.execute({
      orderId: 'random-id',
    })

    expect(order.isLeft()).toBeTruthy()
  })
})
