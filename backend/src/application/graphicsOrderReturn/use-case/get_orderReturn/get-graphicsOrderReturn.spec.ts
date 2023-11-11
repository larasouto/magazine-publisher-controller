import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { IGraphicsOrderReturnRepository } from '../../repositories/interfaces/IGraphicsOrderReturnRepository'
import { GetGraphicsOrderReturn } from './get-graphicsOrderReturn'
import { InMemoryGraphicsOrderReturnsRepository } from '../../repositories/in-memory/InMemoryGraphicsOrderReturnRepository'

let graphicsOrdersReturnRepository: IGraphicsOrderReturnRepository
let getGraphicsOrderReturn: GetGraphicsOrderReturn

describe('Get a order', () => {
  beforeEach(() => {
    graphicsOrdersReturnRepository = new InMemoryGraphicsOrderReturnsRepository()
    getGraphicsOrderReturn = new GetGraphicsOrderReturn(graphicsOrdersReturnRepository)
  })

  test('should be able to get a order return', async () => {
    const data: any = {
      id: uuid(),
      returnDate: new Date(),
      returnNumber: 12,
      graphicsOrderId: uuid(),
    }

    await graphicsOrdersReturnRepository.create(data)
    const order = await getGraphicsOrderReturn.execute({
      graphicsOrderReturnId: data.id,
    })

    expect(order.isRight()).toBeTruthy()
  })

  test('should not be able to get a non existing order return', async () => {
    const order = await getGraphicsOrderReturn.execute({
      graphicsOrderReturnId: 'random-id',
    })

    expect(order.isLeft()).toBeTruthy()
  })
})
