import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { IGraphicsRepository } from '../../repositories/Interfaces/IGraphicsRepository'
import { DeleteGraphics } from './delete-graphics'
import { InMemoryGraphicssRepository } from '../../repositories/in-memory/InMemoryGraphicsRepository'

let GraphicsRepository: IGraphicsRepository
let deleteGraphics: DeleteGraphics

describe('Delete a graphics', () => {
  beforeEach(() => {
    GraphicsRepository = new InMemoryGraphicssRepository()
    deleteGraphics = new DeleteGraphics(GraphicsRepository)
  })

  test('should be able to delete a graphics', async () => {
    const data: any = {
      id: uuid(),
      name: 'graphics-name-delete',
      address: 'graphics-address-delete',
    }

    await GraphicsRepository.create(data)
    expect(await GraphicsRepository.findById(data.id)).toBeTruthy()

    const deletedGraphics = await deleteGraphics.execute({
      graphicsId: data.id,
    })

    expect(deletedGraphics.isRight()).toBeTruthy()
  })

  test('should not be able to delete a non-existing graphics', async () => {
    const nonExistingGraphicsId = 'non-existing-id'

    const nonExistingGraphics = await deleteGraphics.execute({
      graphicsId: nonExistingGraphicsId,
    })

    expect(nonExistingGraphics).toBeTruthy()
  })
})
