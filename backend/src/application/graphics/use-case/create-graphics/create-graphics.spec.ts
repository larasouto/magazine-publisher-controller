import { beforeEach, describe, expect, test } from 'vitest'
import { Graphics } from '../../domain/graphics'
import { IGraphicsRepository } from '../../repositories/Interfaces/IGraphicsRepository'
import { CreateGraphics } from './create-graphics'
import { InMemoryGraphicssRepository } from '../../repositories/in-memory/InMemoryGraphicsRepository'

let graphicsRepository: IGraphicsRepository
let createGraphics: CreateGraphics

describe('Create a graphics', () => {
  beforeEach(() => {
    graphicsRepository = new InMemoryGraphicssRepository()
    createGraphics = new CreateGraphics(graphicsRepository)
  })

  test('should be able to create a graphics', async () => {
    const data: any = {
      name: 'graphics-name',
      address: 'graphics-address',
    }

    const response = await createGraphics.execute(data)
    const graphics = response.value as Graphics

    expect(graphics).toBeTruthy()
    expect(await graphicsRepository.findById(graphics.id)).toBeTruthy()
  })

  test('should not be able to create a graphics with empty data', async () => {
    const data: any = {}

    const response = await createGraphics.execute(data)
    expect(response.isLeft()).toBeTruthy()
  })

  test('should not be able to create a graphics without name', async () => {
    const data: any = {
      address: 'graphics-address',
    }

    const response = await createGraphics.execute(data)
    expect(response.isLeft()).toBeTruthy()
  })
})
