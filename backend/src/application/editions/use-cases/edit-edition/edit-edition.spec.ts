import { v4 as uuid } from 'uuid'
import { beforeAll, describe, expect, test } from 'vitest'
import { InMemoryEditionsRepository } from '../../repositories/in-memory/InMemoryEditionsRepository'
import { IEditionRepository } from '../../repositories/interfaces/IEditionRepository'
import { EditEdition } from './edit-edition'

let editionsRepository: IEditionRepository
let editEdition: EditEdition

const theme: any = {
  id: uuid(),
  name: 'test-create-name-theme',
  description: 'test-create-description-theme',
}

const magazine: any = {
  id: uuid(),
  name: 'test-create-name-magazine',
  description: 'test-create-description-magazine',
  year_founded: 2021,
  publication_period: 'ANNUALLY',
  theme_id: theme.id,
}

describe('Edit an edition', () => {
  beforeAll(() => {
    editionsRepository = new InMemoryEditionsRepository()
    editEdition = new EditEdition(editionsRepository)
  })

  test('should be able to update a edition', async () => {
    const data: any = {
      id: uuid(),
      number: 1,
      title: 'test-create-title-edition',
      description: 'test-create-description-edition',
      coverPath: 'test-create-cover-path-edition',
      price: 49.9,
      year: 2023,
      publicationDate: new Date(),
      numberOfCopies: 100,
      numberOfPages: 254,
      magazineId: magazine.id,
    }

    await editionsRepository.create(data)
    expect(await editionsRepository.findById(data.id)).toBeTruthy()

    const updatedEdition = await editEdition.execute({
      editionId: data.id,
      number: 10,
      title: 'test-update-title-edition',
      description: 'test-update-description-edition',
      coverPath: 'test-update-cover-path-edition',
      price: 100.0,
      year: 2023,
      publicationDate: new Date(),
      numberOfCopies: 200,
      numberOfPages: 240,
      magazineId: magazine.id,
    })
    expect(updatedEdition.isRight()).toBeTruthy()

    const edition = await editionsRepository.findById(data.id)
    expect(edition).toEqual(updatedEdition.value)
  })

  test('should not be able to update a edition with invalid data', async () => {
    const data: any = {
      id: uuid(),
      number: 1,
      title: 'test-create-title-edition',
      description: 'test-create-description-edition',
      coverPath: 'test-create-cover-path-edition',
      price: 49.9,
      year: 2023,
      publicationDate: new Date(),
      numberOfCopies: 100,
      numberOfPages: 254,
      magazineId: magazine.id,
    }

    await editionsRepository.create(data)
    expect(await editionsRepository.findById(data.id)).toBeTruthy()

    const updatedEdition = await editEdition.execute({
      editionId: data.id,
      number: 10,
      title: '',
      coverPath: 'test-update-cover-path-edition',
      price: 100.0,
      year: 2023,
      publicationDate: new Date(),
      numberOfCopies: 0,
      numberOfPages: 0,
      magazineId: 'invalid-magazine-id',
    })
    expect(updatedEdition.isLeft()).toBeTruthy()
  })
})
