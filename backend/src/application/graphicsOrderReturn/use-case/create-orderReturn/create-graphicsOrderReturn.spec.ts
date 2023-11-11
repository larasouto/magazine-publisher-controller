import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { IGraphicsOrderReturnRepository } from '../../repositories/interfaces/IGraphicsOrderReturnRepository'
import { CreateGraphicsOrderReturn } from './create-graphicsOrderReturn'
import { InMemoryGraphicsOrderReturnsRepository } from '../../repositories/in-memory/InMemoryGraphicsOrderReturnRepository'
import { GraphicsOrderReturn } from '../../domain/graphicsOrderReturn'

let GraphicsOrdersReturnRepository: IGraphicsOrderReturnRepository
let createGraphicsOrderReturn: CreateGraphicsOrderReturn

describe('Create a OrderReturn', () => {
  beforeEach(() => {
    GraphicsOrdersReturnRepository = new InMemoryGraphicsOrderReturnsRepository()
    createGraphicsOrderReturn = new CreateGraphicsOrderReturn(GraphicsOrdersReturnRepository)
  })

  test('should be able to create a GraphicsOrderReturn', async () => {
    const data: any = {
      returnDate: new Date(),
      returnNumber: 12,
      graphicsOrderId: uuid(),
    }

    const response = await createGraphicsOrderReturn.execute(data)
    const OrderReturn = response.value as GraphicsOrderReturn

    expect(OrderReturn).toBeTruthy()
    expect(await GraphicsOrdersReturnRepository.findById(OrderReturn.id)).toBeTruthy()
  })

  test('should not be able to create a Graphics order return with empty data', async () => {
    const data: any = {
      returnDate: null,
      returnNumber: null,
      graphicsOrderId: uuid(),
    }

    const response = await createGraphicsOrderReturn.execute(data)
    expect(response.isLeft()).toBeTruthy()
  })
})
