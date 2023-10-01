import { IThemeRepository } from '@/application/themes/repositories/interfaces/IThemeRepository'

import { InMemoryThemesRepository } from '@/application/themes/repositories/in-memory/InMemoryThemesRepository'
import { v4 as uuid } from 'uuid'
import { beforeAll, describe, expect, test } from 'vitest'
import { Magazine } from '../../domain/magazine'
import { InMemoryMagazinesRepository } from '../../repositories/in-memory/InMemoryMagazinesRepository'
import { IMagazineRepository } from '../../repositories/interfaces/IMagazineRepository'
import { CreateMagazine } from './create-magazine'

let magazinesRepository: IMagazineRepository
let themesRepository: IThemeRepository
let createMagazine: CreateMagazine

describe('Create a magazine', () => {
  beforeAll(() => {
    magazinesRepository = new InMemoryMagazinesRepository()
    createMagazine = new CreateMagazine(magazinesRepository)
    themesRepository = new InMemoryThemesRepository()
  })

  test('should be able to create a magazine', async () => {
    const theme: any = {
      id: uuid(),
      name: 'theme-name',
      description: 'theme-description',
    }

    await themesRepository.create(theme)

    const data: any = {
      name: 'magazine-name',
      description: 'magazine-description',
      yearFounded: 2021,
      publicationPeriod: 'MONTHLY',
      themeId: theme.id,
    }

    const response = await createMagazine.execute(data)
    const magazine = response.value as Magazine

    expect(magazine).toBeTruthy()
    expect(await magazinesRepository.findById(magazine.id)).toBeTruthy()
  })

  test('should be able to create a magazine without description', async () => {
    const theme: any = {
      id: uuid(),
      name: 'theme-name',
      description: 'theme-description',
    }

    const data: any = {
      name: 'magazine-name',
      yearFounded: 2021,
      publicationPeriod: 'MONTHLY',
      themeId: theme.id,
    }

    const response = await createMagazine.execute(data)
    const magazine = response.value as Magazine

    expect(magazine).toBeTruthy()
    expect(await magazinesRepository.findById(magazine.id)).toBeTruthy()
  })

  test('should not be able to create a magazine with empty data', async () => {
    const data: any = {}

    const response = await createMagazine.execute(data)
    expect(response.isLeft()).toBeTruthy()
  })

  test('should not be able to create a magazine without name', async () => {
    const theme: any = {
      id: uuid(),
      name: 'theme-name',
      description: 'theme-description',
    }

    await themesRepository.create(theme)

    const data: any = {
      description: 'magazine-description',
      yearFounded: 2021,
      publicationPeriod: 'MONTHLY',
      themeId: theme.id,
    }

    const response = await createMagazine.execute(data)
    expect(response.isLeft()).toBeTruthy()
  })
})
