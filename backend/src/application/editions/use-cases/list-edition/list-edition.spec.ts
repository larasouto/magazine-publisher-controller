import { beforeAll, beforeEach, describe, expect, test } from 'vitest'
import { IEditionRepository } from '../../repositories/interfaces/IEditionRepository'
import { ListEditions } from './list-edition'
import { InMemoryEditionsRepository } from '../../repositories/in-memory/InMemoryEditionsRepository'
import { afterEach } from 'node:test'

let editionsRepository: IEditionRepository
let listEditions: ListEditions

describe('List editions', () => {
  beforeEach(() => {
    editionsRepository = new InMemoryEditionsRepository()
    listEditions = new ListEditions(editionsRepository)
  })

  test('should be able to list editions', async () => {
    const edition1: any = {
      number: 1,
      title: 'test-list-title-edition',
      description: 'test-list-description-edition',
      coverPath: 'test-list-cover-path-edition',
      price: 49.9,
      year: 2023,
      publicationDate: new Date(),
      numberOfCopies: 100,
      numberOfPages: 254,
      magazineId: 'test-list-magazine-id-edition',
    }

    const edition2: any = {
      ...edition1,
      title: 'test-list-title-edition-2',
      description: 'test-list-description-edition-2',
    }

    await editionsRepository.create(edition1)
    await editionsRepository.create(edition2)

    const editions = await listEditions.execute()
    expect(editions.length).toBe(2)
  })

  test('should be able to get empty array if there are no editions', async () => {
    const editions = await listEditions.execute()
    expect(editions.length).toBe(0)
  })
})
