import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { IGraphicsRepository } from '../../repositories/Interfaces/IGraphicsRepository'
import { InMemoryGraphicssRepository } from '../../repositories/in-memory/InMemoryGraphicsRepository'
import { EditGraphics } from './edit-graphics'

let graphicsRepository: IGraphicsRepository
let editGraphics: EditGraphics

describe('Create a graphics', () => {
  beforeEach(() => {
    graphicsRepository = new InMemoryGraphicssRepository()
    editGraphics = new EditGraphics(graphicsRepository)
  })

  test('should be able to update a graphics', async () => {
    const data: any = {
      id: uuid(),
      name: 'graphics-name',
      address: 'graphics-address',
    }

    await graphicsRepository.create(data)
    expect(await graphicsRepository.findById(data.id)).toBeTruthy()

    const updatedGraphics = await editGraphics.execute({
      graphicsId: data.id,
      name: 'graphics-name-updated',
      address: 'graphics-address-updated',
    })
    expect(updatedGraphics.isRight()).toBeTruthy()

    const graphics = await graphicsRepository.findById(data.id)
    expect(graphics).toEqual(updatedGraphics.value)
  })

  test('should be able to update only the name in a graphics', async () => {
    const data: any = {
      id: uuid(),
      name: 'graphics-name',
      address: 'graphics-address',
    }

    await graphicsRepository.create(data)
    expect(await graphicsRepository.findById(data.id)).toBeTruthy()

    const updatedGraphics = await editGraphics.execute({
      graphicsId: data.id,
      name: 'graphics-name-updated',
      address: 'graphics-address',
    })
    expect(updatedGraphics.isRight()).toBeTruthy()

    const graphics = await graphicsRepository.findById(data.id)
    expect(graphics).toEqual(updatedGraphics.value)
  })

  test('should be able to update only the address in a graphics', async () => {
    const data: any = {
      id: uuid(),
      name: 'graphics-name',
      address: 'graphics-address',
    }

    await graphicsRepository.create(data)
    expect(await graphicsRepository.findById(data.id)).toBeTruthy()

    const updatedGraphics = await editGraphics.execute({
      graphicsId: data.id,
      name: 'test-graphics',
      address: 'test-graphics-address-updated',
    })
    expect(updatedGraphics.isRight()).toBeTruthy()

    const graphics = await graphicsRepository.findById(data.id)
    expect(graphics).toEqual(updatedGraphics.value)
  })
})
