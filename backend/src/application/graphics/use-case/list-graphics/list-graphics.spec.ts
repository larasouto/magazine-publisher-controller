import { beforeEach, describe, expect, test } from 'vitest'
import { ListGraphics } from './list-graphics'
import { CreateGraphics } from '../create-graphics/create-graphics'
import { IGraphicsRepository } from '../../repositories/Interfaces/IGraphicsRepository'
import { InMemoryGraphicssRepository } from '../../repositories/in-memory/InMemoryGraphicsRepository'
import { Graphics } from '../../domain/graphics'

let listGraphics: ListGraphics
let createGraphics: CreateGraphics
let graphicsRepository: IGraphicsRepository

describe('List graphicss', () => {
  beforeEach(() => {
    graphicsRepository = new InMemoryGraphicssRepository()
    listGraphics = new ListGraphics(graphicsRepository)
    createGraphics = new CreateGraphics(graphicsRepository)
  })

  test('should list all graphicss', async () => {
    const data1 = {
      name: 'graphics-name',
      address: 'graphics-address',
    }

    const data2 = {
      name: 'second-graphics-name',
      address: 'second-graphics-address',
    }

    const response1 = await createGraphics.execute(data1)
    const graphics1 = response1.value as Graphics

    const response2 = await createGraphics.execute(data2)
    const graphics2 = response2.value as Graphics

    expect(graphics1).toBeTruthy()
    expect(await graphicsRepository.findById(graphics1.id)).toBeTruthy()

    expect(graphics2).toBeTruthy()
    expect(await graphicsRepository.findById(graphics2.id)).toBeTruthy()

    const response = await listGraphics.execute()
    expect(response.length).toBe(2)

    expect(response[0].props.name).toBe(graphics1.props.name)
    expect(response[1].props.name).toBe(graphics2.props.name)
  })

  test('should return an empty list if no graphicss exist', async () => {
    const response = await listGraphics.execute()
    expect(response.length).toBe(0)
  })
})
