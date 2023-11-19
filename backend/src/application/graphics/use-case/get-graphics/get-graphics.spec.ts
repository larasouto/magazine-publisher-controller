import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { GetGraphics } from './get-graphics'
import { IGraphicsRepository } from '../../repositories/Interfaces/IGraphicsRepository'
import { InMemoryGraphicssRepository } from '../../repositories/in-memory/InMemoryGraphicsRepository'

let graphicssRepository: IGraphicsRepository
let getGraphicsGetGraphics: GetGraphics

describe('Get a graphics', () => {
  beforeEach(() => {
    graphicssRepository = new InMemoryGraphicssRepository()
    getGraphicsGetGraphics = new GetGraphics(graphicssRepository)
  })

  test('should be able to get a graphics', async () => {
    const data: any = {
      id: uuid(),
      name: 'graphics-name',
      address: 'graphics-address',
    }

    await graphicssRepository.create(data)
    const graphics = await getGraphicsGetGraphics.execute({
      graphicsId: data.id,
    })

    expect(graphics.isRight()).toBeTruthy()
  })

  test('should not be able to get a non existing graphics', async () => {
    const graphics = await getGraphicsGetGraphics.execute({
      graphicsId: 'random-id',
    })

    expect(graphics.isLeft()).toBeTruthy()
  })
})
