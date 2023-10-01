import { InMemoryMagazinesRepository } from '@/application/magazines/repositories/in-memory/InMemoryMagazinesRepository'
import { v4 as uuid } from 'uuid'
import { beforeAll, describe, expect, test } from 'vitest'
import { IMagazineRepository } from '../../repositories/interfaces/IMagazineRepository'
import { GetMagazine } from './get-magazine'

let magazinesRepository: IMagazineRepository
let getMagazine: GetMagazine

describe('Get a magazine', () => {
  beforeAll(() => {
    magazinesRepository = new InMemoryMagazinesRepository()
    getMagazine = new GetMagazine(magazinesRepository)
  })

  test('should be able to get a magazine', async () => {
    const theme: any = {
      id: uuid(),
      name: 'theme-name',
      description: 'theme-description',
    }

    await magazinesRepository.create(theme)

    const data: any = {
      id: uuid(),
      name: 'magazine-name',
      description: 'magazine-description',
      yearFounded: 2021,
      publicationPeriod: 'ANNUALLY',
      themeId: theme.id,
    }

    await magazinesRepository.create(data)
    const magazine = await getMagazine.execute({ magazineId: data.id })

    expect(magazine.isRight()).toBeTruthy()
  })

  test('should not be able to get a non existing magazine', async () => {
    const magazine = await getMagazine.execute({ magazineId: 'random-id' })

    expect(magazine.isLeft()).toBeTruthy()
  })
})
