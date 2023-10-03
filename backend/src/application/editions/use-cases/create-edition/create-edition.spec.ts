import { v4 as uuid } from 'uuid'
import { InMemoryEditionsRepository } from '../../repositories/in-memory/InMemoryEditionsRepository'
import { CreateEdition } from './create-edition'
import { beforeAll, describe, expect, test } from 'vitest'
import { Edition } from '../../domain/edition'
import { InMemoryMagazinesRepository } from '@/application/magazines/repositories/in-memory/InMemoryMagazinesRepository'
import { InMemoryThemesRepository } from '@/application/themes/repositories/in-memory/InMemoryThemesRepository'
import { InMemorySubtitlesRepository } from '@/application/subtitles/repositories/in-memory/InMemorySubtitlesRepository'
import { ISubtitleRepository } from '@/application/subtitles/repositories/interfaces/ISubtitleRepository'
import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { IEditionRepository } from '../../repositories/interfaces/IEditionRepository'

let editionsRepository: IEditionRepository
let createEdition: CreateEdition
let magazinesRepository: IMagazineRepository
let themesRepository: InMemoryThemesRepository
let subtitleRepository: ISubtitleRepository

const theme: any = {
  id: uuid(),
  title: 'test-theme',
  description: 'test-theme-description',
}

const magazine: any = {
  id: uuid(),
  title: 'test-magazine',
  description: 'test-magazine-description',
  yearFounded: 2021,
  publicationPeriod: 'MONTHLY',
  themeId: theme.id,
}

describe('Create a edition', () => {
  beforeAll(() => {
    magazinesRepository = new InMemoryMagazinesRepository()
    themesRepository = new InMemoryThemesRepository()
    subtitleRepository = new InMemorySubtitlesRepository()
    editionsRepository = new InMemoryEditionsRepository()
    createEdition = new CreateEdition(editionsRepository)
  })

  test('should be able to create a edition', async () => {
    await themesRepository.create(theme)
    await magazinesRepository.create(magazine)

    const subtitle: any = {
      id: uuid(),
      title: 'test-subtitle',
      description: 'test-subtitle-description',
    }

    const subtitle2: any = {
      id: uuid(),
      title: 'test-subtitle',
      description: 'test-subtitle-description',
    }

    await subtitleRepository.create(subtitle)
    await subtitleRepository.create(subtitle2)

    const data: any = {
      number: 1,
      title: 'test-edition',
      description: 'test-edition-description',
      coverPath: 'test-edition-cover-path',
      price: 10.0,
      year: 2023,
      publicationDate: new Date(),
      numberOfCopies: 100,
      numberOfPages: 100,
      magazineId: magazine.id,
    }

    const response = await createEdition.execute(data)

    const edition = response.value as Edition

    expect(edition).toBeTruthy()
    expect(await editionsRepository.findById(edition.id)).toBeTruthy()
  })

  test('should be able to create a edition without description', async () => {
    await themesRepository.create(theme)
    await magazinesRepository.create(magazine)

    const subtitle: any = {
      id: uuid(),
      title: 'test-subtitle',
      description: 'test-subtitle-description',
    }

    const subtitle2: any = {
      id: uuid(),
      title: 'test-subtitle',
      description: 'test-subtitle-description',
    }

    await subtitleRepository.create(subtitle)
    await subtitleRepository.create(subtitle2)

    const data: any = {
      number: 1,
      title: 'test-edition',
      coverPath: 'test-edition-cover-path',
      price: 10.0,
      year: 2023,
      publicationDate: new Date(),
      numberOfCopies: 100,
      numberOfPages: 100,
      magazineId: magazine.id,
      subtitles: [subtitle.id, subtitle2.id],
    }

    const response = await createEdition.execute(data)
    const edition = response.value as Edition

    expect(edition).toBeTruthy()
    expect(await editionsRepository.findById(edition.id)).toBeTruthy()
  })

  test('should not be able to create a edition with empty data', async () => {
    const data: any = {}

    const response = await createEdition.execute(data)
    expect(response.isLeft()).toBeTruthy()
  })
})
