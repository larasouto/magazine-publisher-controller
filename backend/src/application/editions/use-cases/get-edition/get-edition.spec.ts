import { InMemoryEditionsRepository } from '@/application/editions/repositories/in-memory/InMemoryEditionsRepository'
import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { IEditionRepository } from '../../repositories/interfaces/IEditionRepository'
import { GetEdition } from './get-edition'

let editionsRepository: IEditionRepository
let getEdition: GetEdition

const theme: any = {
  id: uuid(),
  name: 'test-get-name-theme',
  description: 'test-create-description-theme',
}

const magazine: any = {
  id: uuid(),
  name: 'test-get-name-magazine',
  description: 'test-create-description-magazine',
  year_founded: 2021,
  publication_period: 'ANNUALLY',
  theme_id: theme.id,
}

describe('Get a edition', () => {
  beforeEach(() => {
    editionsRepository = new InMemoryEditionsRepository()
    getEdition = new GetEdition(editionsRepository)
  })

  test('should be able to get a edition', async () => {
    const data: any = {
      id: uuid(),
      number: 1,
      title: 'test-get-title-edition',
      description: 'test-description-edition',
      coverPath: 'test-cover-path-edition',
      price: 49.9,
      year: 2023,
      publicationDate: new Date(),
      numberOfCopies: 100,
      numberOfPages: 254,
      magazineId: magazine.id,
    }

    await editionsRepository.create(data)
    const edition = await getEdition.execute({ editionId: data.id })

    expect(edition.isRight()).toBeTruthy()
  })

  test('should not be able to get a non existing edition', async () => {
    const edition = await getEdition.execute({ editionId: 'random-id' })

    expect(edition.isLeft()).toBeTruthy()
  })
})
