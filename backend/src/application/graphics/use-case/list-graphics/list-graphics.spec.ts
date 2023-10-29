import { beforeEach, describe, expect, test } from 'vitest'
import { IGraphicsRepository } from '../../repositories/Interfaces/IGraphicsRepository'
import { InMemoryGraphicssRepository } from '../../repositories/in-memory/InMemoryGraphicsRepository'
import { CreateGraphics } from '../create-graphics/create-graphics'
import { ListGraphics } from './list-graphics'
import { Graphics } from '../../domain/graphics'
import { v4 as uuid } from 'uuid'

let listGraphics: ListGraphics
let createGraphics: CreateGraphics
let graphicssRepository: IGraphicsRepository

describe('List graphics', () => {
  beforeEach(() => {
    graphicssRepository = new InMemoryGraphicssRepository()
    listGraphics = new ListGraphics(graphicssRepository)
    createGraphics = new CreateGraphics(graphicssRepository)
  })

  test('should list all graphics', async () => {
    const data1 = {
      id: uuid(),
      name: 'graphics-name',
      address: 'graphics-address',
    }

    const data2 = {
      id: uuid(),
      name: 'graphics-name',
      address: 'graphics-address',
    }

    const response1 = await createGraphics.execute(data1)
    const photographer1 = response1.value as Graphics

    const response2 = await createGraphics.execute(data2)
    const photographer2 = response2.value as Graphics

    expect(photographer1).toBeTruthy()
    expect(
      await graphicssRepository.findById(photographer1.id),
    ).toBeTruthy()

    expect(photographer2).toBeTruthy()
    expect(
      await graphicssRepository.findById(photographer2.id),
    ).toBeTruthy()

    const response = await listGraphics.execute()
    expect(response.length).toBe(2)

    expect(response[0].props.name).toBe(photographer1.props.name)
    expect(response[1].props.name).toBe(photographer2.props.name)
  })

  test('should return an empty list if no graphicss exist', async () => {
    const response = await listGraphics.execute()
    expect(response.length).toBe(0)
  })
})
