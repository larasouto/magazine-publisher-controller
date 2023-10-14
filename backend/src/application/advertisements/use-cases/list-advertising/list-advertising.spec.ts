import { beforeAll, beforeEach, describe, expect, test } from 'vitest'
import { afterEach } from 'node:test'
import { IAdvertisingRepository } from '../../repositories/interfaces/IAdvertisingRepository'
import { ListAdvertisements } from './list-advertising'
import { InMemoryAdvertisementsRepository } from '../../repositories/in-memory/InMemoryAdvertisementsRepository'

let advertisementsRepository: IAdvertisingRepository
let listAdvertisements: ListAdvertisements

describe('List advertisements', () => {
  beforeEach(() => {
    advertisementsRepository = new InMemoryAdvertisementsRepository()
    listAdvertisements = new ListAdvertisements(advertisementsRepository)
  })

  test('should be able to list advertisements', async () => {
    const advertising1: any = {
      name: 'test-create-name-advertising',
      categoryAdvertising: 'test-create-category_advertising',
      numberOfPages: 8,
      price: 46.6,
    }

    const advertising2: any = {
      ...advertising1,
      name: 'test-create-name-advertising2',
      categoryAdvertising: 'test-create-category_advertising2',
      numberOfPages: 4,
      price: 43.6,
    }

    await advertisementsRepository.create(advertising1)
    await advertisementsRepository.create(advertising2)

    const advertisements = await listAdvertisements.execute()
    expect(advertisements.length).toBe(2)
  })

  test('should be able to get empty array if there are no advertisements', async () => {
    const advertisements = await listAdvertisements.execute()
    expect(advertisements.length).toBe(0)
  })
})
