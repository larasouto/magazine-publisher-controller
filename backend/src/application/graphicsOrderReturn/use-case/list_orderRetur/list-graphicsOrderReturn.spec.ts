import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { GraphicsOrderReturn } from '../../domain/graphicsOrderReturn'
import { CreateGraphicsOrderReturn } from '../create-orderReturn/create-graphicsOrderReturn'
import { ListGraphicsOrderReturn } from './list-graphicsOrderReturn'
import { InMemoryGraphicsOrderReturnsRepository } from '../../repositories/in-memory/InMemoryGraphicsOrderReturnRepository'
import { IGraphicsOrderReturnRepository } from '../../repositories/interfaces/IGraphicsOrderReturnRepository'


let listOrderReturn: ListGraphicsOrderReturn
let createOrderReturn: CreateGraphicsOrderReturn
let graphicsorderReturnRepository: IGraphicsOrderReturnRepository

describe('List graphicsorderReturn', () => {
  beforeEach(() => {
    graphicsorderReturnRepository = new InMemoryGraphicsOrderReturnsRepository()
    listOrderReturn = new ListGraphicsOrderReturn(graphicsorderReturnRepository)
    createOrderReturn = new CreateGraphicsOrderReturn(graphicsorderReturnRepository)
  })

  test('should list all graphicsorderReturn', async () => {
    const data1 = {
      returnDate: new Date(),
      returnNumber: 12,
      graphicsOrderId: uuid(),
    }

    const data2 = {
      returnDate: new Date(),
      returnNumber: 12,
      graphicsOrderId: uuid(),
    }

    const response1 = await createOrderReturn.execute(data1)
    const reporter1 = response1.value as GraphicsOrderReturn

    const response2 = await createOrderReturn.execute(data2)
    const reporter2 = response2.value as GraphicsOrderReturn

    expect(reporter1).toBeTruthy()
    expect(await graphicsorderReturnRepository.findById(reporter1.id)).toBeTruthy()

    expect(reporter2).toBeTruthy()
    expect(await graphicsorderReturnRepository.findById(reporter2.id)).toBeTruthy()

    const response = await listOrderReturn.execute()
    expect(response.length).toBe(2)

    expect(response[0].props.graphicsOrderId).toBe(reporter1.props.graphicsOrderId)
    expect(response[1].props.graphicsOrderId).toBe(reporter2.props.graphicsOrderId)
  })

  test('should return an empty list if no graphicsorderReturn exist', async () => {
    const response = await listOrderReturn.execute()
    expect(response.length).toBe(0)
  })
})
