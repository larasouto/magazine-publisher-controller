import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { Status } from '../../domain/graphicsOrder.schema'
import { InMemoryGraphicsOrdersRepository } from '../../repositories/in-memory/InMemoryGraphicsOrderrRepository'
import { IGraphicsOrderRepository } from '../../repositories/interfaces/IGraphicsOrderRepository'
import { GetGraphicsOrder } from './get-graphicsOrder'

let graphicsOrdersRepository: IGraphicsOrderRepository
let getGraphicsOrderGetOrder: GetGraphicsOrder

describe('Get a graphicsOrder', () => {
  beforeEach(() => {
    graphicsOrdersRepository = new InMemoryGraphicsOrdersRepository()
    getGraphicsOrderGetOrder = new GetGraphicsOrder(graphicsOrdersRepository)
  })

  test('should be able to get a graphicsOrder', async () => {
    const data: any = {
      id: uuid(),
      receiptDate: new Date(),
      departureDate: new Date(),
      status: Status.deliv,
      deliveryAddress: 'graphicsOrder-deliveryAddress',
      exampleNumber: 12,
      price: 12,
      editionId: uuid(),
      graphicsDistributorId: uuid(),
      bookstoreId: uuid(),
    }

    await graphicsOrdersRepository.create(data)
    const graphicsOrder = await getGraphicsOrderGetOrder.execute({
      graphicsOrderId: data.id,
    })

    expect(graphicsOrder.isRight()).toBeTruthy()
  })

  test('should not be able to get a non existing graphicsOrder', async () => {
    const graphicsOrder = await getGraphicsOrderGetOrder.execute({
      graphicsOrderId: 'random-id',
    })

    expect(graphicsOrder.isLeft()).toBeTruthy()
  })
})
