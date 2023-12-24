import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { IGraphicsRepository } from '../../repositories/Interfaces/IGraphicsRepository'
import { DeleteGraphic } from './delete-graphics'
import { InMemoryGraphicssRepository } from '../../repositories/in-memory/InMemoryGraphicsRepository'

let GraphicsRepository: IGraphicsRepository
let deleteGraphics: DeleteGraphic

describe('Delete a graphics', () => {
  beforeEach(() => {
    GraphicsRepository = new InMemoryGraphicssRepository()
    deleteGraphics = new DeleteGraphic(GraphicsRepository)
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
      ids: data.id,
    })

    expect(deletedGraphics.isRight()).toBeTruthy()
  })

  test('should not be able to delete a non-existing graphics', async () => {
    const nonExistingGraphicsId = 'non-existing-id'

    const nonExistingGraphics = await deleteGraphics.execute({
      ids: nonExistingGraphicsId,
    })

    expect(nonExistingGraphics).toBeTruthy()
  })
})
