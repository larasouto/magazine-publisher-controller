import { beforeEach, describe, expect, test } from 'vitest'
import { IGraphicsOrderRepository } from '../../repositories/interfaces/IGraphicsOrderRepository'
import { CreateGraphicsOrder } from './create-graphicsOrder'
import { InMemoryGraphicsOrdersRepository } from '../../repositories/in-memory/InMemoryGraphicsOrderrRepository'
import { GraphicsOrder } from '../../domain/graphicsOrder'
import { Status } from '../../domain/graphicsOrder.schema'
import { v4 as uuid } from 'uuid'

let graphicsOrderRepository: IGraphicsOrderRepository
let createGraphicsOrder: CreateGraphicsOrder

describe('Create a graphicsOrder', () => {
  beforeEach(() => {
    graphicsOrderRepository = new InMemoryGraphicsOrdersRepository()
    createGraphicsOrder = new CreateGraphicsOrder(graphicsOrderRepository)
  })

  test('should be able to create a graphicsOrder', async () => {
    const data: any = {
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

    const response = await createGraphicsOrder.execute(data)
    const graphicsOrder = response.value as GraphicsOrder

    expect(graphicsOrder).toBeTruthy()
    expect(
      await graphicsOrderRepository.findById(graphicsOrder.id),
    ).toBeTruthy()
  })

  test('should not be able to create a order with empty data', async () => {
    const data: any = {
      receiptDate: null,
      departureDate: null,
      status: null,
      deliveryAddress: '',
      exampleNumber: null,
      price: null,
      editionId: uuid(),
      graphicsDistributorId: uuid(),
      bookstoreId: uuid(),
    }

    const response = await createGraphicsOrder.execute(data)
    expect(response.isLeft()).toBeTruthy()
  })
})
