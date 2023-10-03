import { InMemoryThemesRepository } from '@/application/themes/repositories/in-memory/InMemoryThemesRepository'
import { IThemeRepository } from '@/application/themes/repositories/interfaces/IThemeRepository'
import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { Edition } from '../../domain/edition'
import { InMemoryEditionsRepository } from '../../repositories/in-memory/InMemoryEditionsRepository'
import { IEditionRepository } from '../../repositories/interfaces/IEditionRepository'
import { CreateEdition } from '../create-edition/create-edition'
import { ListEditions } from './list-edition'
import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { InMemoryMagazinesRepository } from '@/application/magazines/repositories/in-memory/InMemoryMagazinesRepository'

let listEditions: ListEditions
let createEdition: CreateEdition
let editionsRepository: IEditionRepository
let themesRepository: IThemeRepository
let magazinesRepository: IMagazineRepository

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

describe('List editions', () => {
  const themeData: any = {
    id: uuid(),
    name: 'theme-name',
    description: 'theme-description',
  }

  beforeEach(async () => {
    editionsRepository = new InMemoryEditionsRepository()
    listEditions = new ListEditions(editionsRepository)
    createEdition = new CreateEdition(editionsRepository)
    themesRepository = new InMemoryThemesRepository()
    magazinesRepository = new InMemoryMagazinesRepository()
    await themesRepository.create(theme)
    await magazinesRepository.create(magazine)
  })

  test('should list all editions', async () => {
    await themesRepository.create(themeData)

    const data1 = {
      number: 1,
      title: 'edition-title',
      description: 'edition-description',
      coverPath: 'edition-cover-path',
      price: 10,
      year: 2021,
      publicationDate: new Date(),
      numberOfCopies: 100,
      numberOfPages: 10,
      magazineId: magazine.id,
    }

    const data2 = {
      number: 1,
      title: 'edition-title-2',
      description: 'edition-description-2',
      coverPath: 'edition-cover-path-2',
      price: 10,
      year: 2021,
      publicationDate: new Date(),
      numberOfCopies: 100,
      numberOfPages: 10,
      magazineId: magazine.id,
    }

    const response1 = await createEdition.execute(data1)
    const edition1 = response1.value as Edition

    const response2 = await createEdition.execute(data2)
    const edition2 = response2.value as Edition

    expect(edition1).toBeTruthy()
    expect(await editionsRepository.findById(edition1.id)).toBeTruthy()

    expect(edition2).toBeTruthy()
    expect(await editionsRepository.findById(edition2.id)).toBeTruthy()

    const response = await listEditions.execute()
    expect(response.length).toBe(2)

    expect(response[0].props.title).toBe(edition1.props.title)
    expect(response[1].props.title).toBe(edition2.props.title)
  })

  test('should return an empty list if no editions exist', async () => {
    const response = await listEditions.execute()
    expect(response.length).toBe(0)
  })
})
