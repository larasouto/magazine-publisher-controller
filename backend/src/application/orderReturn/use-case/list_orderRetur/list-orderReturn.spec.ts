import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { ListOrderReturn } from './list-orderReturn'
import { CreateOrderReturn } from '../create-orderReturn/create-orderReturn'
import { IOrderReturnRepository } from '../../repositories/interfaces/IOrderReturnRepository'
import { InMemoryOrderReturnsRepository } from '../../repositories/in-memory/InMemoryOrderReturnRepository'
import { OrderReturn } from '../../domain/orderReturn'

let listOrderReturn: ListOrderReturn
let createOrderReturn: CreateOrderReturn
let orderReturnRepository: IOrderReturnRepository

describe('List orderReturn', () => {
  beforeEach(() => {
    orderReturnRepository = new InMemoryOrderReturnsRepository()
    listOrderReturn = new ListOrderReturn(orderReturnRepository)
    createOrderReturn = new CreateOrderReturn(orderReturnRepository)
  })

  test('should list all orderReturn', async () => {
    const data1 = {
      returnDate: new Date(),
      returnNumber: 12,
      orderId: uuid(),
    }

    const data2 = {
      returnDate: new Date(),
      returnNumber: 12,
      orderId: uuid(),
    }

    const response1 = await createOrderReturn.execute(data1)
    const reporter1 = response1.value as OrderReturn

    const response2 = await createOrderReturn.execute(data2)
    const reporter2 = response2.value as OrderReturn

    expect(reporter1).toBeTruthy()
    expect(await orderReturnRepository.findById(reporter1.id)).toBeTruthy()

    expect(reporter2).toBeTruthy()
    expect(await orderReturnRepository.findById(reporter2.id)).toBeTruthy()

    const response = await listOrderReturn.execute()
    expect(response.length).toBe(2)

    expect(response[0].props.orderId).toBe(reporter1.props.orderId)
    expect(response[1].props.orderId).toBe(reporter2.props.orderId)
  })

  test('should return an empty list if no orderReturn exist', async () => {
    const response = await listOrderReturn.execute()
    expect(response.length).toBe(0)
  })
})
