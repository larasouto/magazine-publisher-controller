import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryOrderReturnsRepository } from '../../repositories/in-memory/InMemoryOrderReturnRepository'
import { IOrderReturnRepository } from '../../repositories/interfaces/IOrderReturnRepository'
import { CreateOrderReturn } from './create-orderReturn'
import { OrderReturn } from '../../domain/orderReturn'

let OrderReturnsRepository: IOrderReturnRepository
let createOrderReturn: CreateOrderReturn

describe('Create a OrderReturn', () => {
  beforeEach(() => {
    OrderReturnsRepository = new InMemoryOrderReturnsRepository()
    createOrderReturn = new CreateOrderReturn(OrderReturnsRepository)
  })

  test('should be able to create a OrderReturn', async () => {
    const data: any = {
      returnDate: new Date(),
      returnNumber: 12,
      orderId: uuid(),
    }

    const response = await createOrderReturn.execute(data)
    const OrderReturn = response.value as OrderReturn

    expect(OrderReturn).toBeTruthy()
    expect(await OrderReturnsRepository.findById(OrderReturn.id)).toBeTruthy()
  })

  test('should not be able to create a order return with empty data', async () => {
    const data: any = {
      returnDate: null,
      returnNumber: null,
      orderId: uuid(),
    }

    const response = await createOrderReturn.execute(data)
    expect(response.isLeft()).toBeTruthy()
  })
})
