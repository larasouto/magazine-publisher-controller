import { v4 as uuid } from 'uuid'
import { beforeAll, describe, expect, test } from 'vitest'
import { InMemoryEditionsRepository } from '../../repositories/in-memory/InMemoryEditionsRepository'
import { IEditionRepository } from '../../repositories/interfaces/IEditionRepository'
import { DeleteEdition } from './delete-edition'

let editionsRepository: IEditionRepository
let deleteEdition: DeleteEdition

describe('Delete a edition', () => {
  const theme: any = {
    id: uuid(),
    name: 'test-delete-name-theme',
    description: 'test-create-description-theme',
  }

  const magazine: any = {
    id: uuid(),
    name: 'test-delete-name-magazine',
    description: 'test-create-description-magazine',
    year_founded: 2021,
    publication_period: 'ANNUALLY',
    theme_id: theme.id,
  }

  const edition: any = {
    id: uuid(),
    number: 1,
    title: 'test-create-title-edition',
    description: 'test-create-description-edition',
    cover_path: 'test-create-cover-path-edition',
    price: 49.9,
    year: 2023,
    publication_date: new Date(),
    number_of_copies: 100,
    number_of_pages: 254,
    magazine_id: magazine.id,
  }

  beforeAll(() => {
    editionsRepository = new InMemoryEditionsRepository()
    deleteEdition = new DeleteEdition(editionsRepository)
  })

  test('should be able to delete a edition', async () => {
    await editionsRepository.create(edition)
    expect(await editionsRepository.findById(edition.id)).toBeTruthy()

    const deletedEdition = await deleteEdition.execute({
      editionId: edition.id,
    })

    expect(deletedEdition.isRight()).toBeTruthy()
  })

  test('should not be able to delete a non-existing edition', async () => {
    const nonExistingEditionId = 'non-existing-id'

    const nonExistingEdition = await deleteEdition.execute({
      editionId: nonExistingEditionId,
    })

    expect(nonExistingEdition).toBeTruthy()
  })
})
