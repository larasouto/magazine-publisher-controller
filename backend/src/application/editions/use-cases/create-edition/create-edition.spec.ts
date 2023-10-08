import { v4 as uuid } from 'uuid'
import { beforeAll, describe, expect, test } from 'vitest'
import { InMemoryEditionsRepository } from '../../repositories/in-memory/InMemoryEditionsRepository'
import { IEditionRepository } from '../../repositories/interfaces/IEditionRepository'
import { CreateEdition } from './create-edition'

let editionsRepository: IEditionRepository
let createEdition: CreateEdition

describe('Create an edition (end-to-end)', () => {
  beforeAll(() => {
    editionsRepository = new InMemoryEditionsRepository()
    createEdition = new CreateEdition(editionsRepository)
  })

  test('should be able to create an edition', async () => {
    const create: any = {
      number: 1,
      title: 'test-create-title-edition',
      description: 'test-create-description-edition',
      coverPath: 'test-create-cover-path-edition',
      price: 49.9,
      year: 2023,
      publicationDate: new Date(),
      numberOfCopies: 100,
      numberOfPages: 254,
      magazineId: uuid(),
    }

    const edition = await createEdition.execute(create)
    expect(edition.isRight()).toBeTruthy()
  })

  test('should not be able to create an edition with empty data', async () => {
    const create: any = {}

    const edition = await createEdition.execute(create)
    expect(edition.isLeft()).toBeTruthy()
  })
})
