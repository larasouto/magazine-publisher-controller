import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { GetOrderReturn } from './get-orderReturn'
import { IOrderReturnRepository } from '../../repositories/interfaces/IOrderReturnRepository'
import { InMemoryOrderReturnsRepository } from '../../repositories/in-memory/InMemoryOrderReturnRepository'

let ordersReturnRepository: IOrderReturnRepository
let getOrderReturnGetOrder: GetOrderReturn

describe('Get a order', () => {
  beforeEach(() => {
    ordersReturnRepository = new InMemoryOrderReturnsRepository()
    getOrderReturnGetOrder = new GetOrderReturn(ordersReturnRepository)
  })

  test('should be able to get a order return', async () => {
    const data: any = {
      id: uuid(),
      returnDate: new Date(),
      returnNumber: 12,
      orderId: uuid(),
    }

    await ordersReturnRepository.create(data)
    const order = await getOrderReturnGetOrder.execute({
      orderReturnId: data.id,
    })

    expect(order.isRight()).toBeTruthy()
  })

  test('should not be able to get a non existing order return', async () => {
    const order = await getOrderReturnGetOrder.execute({
      orderReturnId: 'random-id',
    })

    expect(order.isLeft()).toBeTruthy()
  })
})
