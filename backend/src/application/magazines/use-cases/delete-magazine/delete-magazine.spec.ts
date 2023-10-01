import { v4 as uuid } from 'uuid'
import { beforeAll, describe, expect, test } from 'vitest'
import { InMemoryMagazinesRepository } from '../../repositories/in-memory/InMemoryMagazinesRepository'
import { IMagazineRepository } from '../../repositories/interfaces/IMagazineRepository'
import { DeleteMagazine } from './delete-magazine'

let magazinesRepository: IMagazineRepository
let deleteMagazine: DeleteMagazine

describe('Delete a magazine', () => {
  beforeAll(() => {
    magazinesRepository = new InMemoryMagazinesRepository()
    deleteMagazine = new DeleteMagazine(magazinesRepository)
  })

  test('should be able to delete a magazine', async () => {
    const themeData: any = {
      id: uuid(),
      name: 'theme-name',
      description: 'theme-description',
    }

    const data: any = {
      name: 'magazine-name',
      description: 'magazine-description',
      yearFounded: 2021,
      publicationPeriod: 'ANNUALLY',
      themeId: themeData.id,
    }

    await magazinesRepository.create(data)
    expect(await magazinesRepository.findById(data.id)).toBeTruthy()

    const deletedMagazine = await deleteMagazine.execute({
      magazineId: data.id,
    })

    expect(deletedMagazine.isRight()).toBeTruthy()
  })

  test('should not be able to delete a non-existing magazine', async () => {
    const nonExistingMagazineId = 'non-existing-id'

    const nonExistingMagazine = await deleteMagazine.execute({
      magazineId: nonExistingMagazineId,
    })

    expect(nonExistingMagazine).toBeTruthy()
  })
})
