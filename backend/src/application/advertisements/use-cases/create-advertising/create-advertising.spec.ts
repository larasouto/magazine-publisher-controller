import { v4 as uuid } from 'uuid'
import { beforeAll, describe, expect, test } from 'vitest'
import { CreateAdvertising } from './create-advertising'
import { IAdvertisingRepository } from '../../repositories/interfaces/IAdvertisingRepository'
import { InMemoryAdvertisementsRepository } from '../../repositories/in-memory/InMemoryAdvertisementsRepository'

let advertisementsRepository: IAdvertisingRepository
let createAdvertising: CreateAdvertising

describe('Create an advertising (end-to-end)', () => {
  beforeAll(() => {
    advertisementsRepository = new InMemoryAdvertisementsRepository()
    createAdvertising = new CreateAdvertising(advertisementsRepository)
  })

  test('should be able to create an advertising', async () => {
    const create: any = {
      name: 'test-create-name-advertising',
      categoryAdvertising: 'test-create-category_advertising',
      numberOfPages: 8,
      price: 46.6,
      magazineId: uuid(),
    }

    const advertising = await createAdvertising.execute(create)
    expect(advertising.isRight()).toBeTruthy()
  })

  test('should not be able to create an advertising with empty data', async () => {
    const create: any = {}

    const advertising = await createAdvertising.execute(create)
    expect(advertising.isLeft()).toBeTruthy()
  })
})
