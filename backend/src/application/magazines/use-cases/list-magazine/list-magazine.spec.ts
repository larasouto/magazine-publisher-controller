import { InMemoryThemesRepository } from '@/application/themes/repositories/in-memory/InMemoryThemesRepository'
import { IThemeRepository } from '@/application/themes/repositories/interfaces/IThemeRepository'
import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { Magazine } from '../../domain/magazine'
import { InMemoryMagazinesRepository } from '../../repositories/in-memory/InMemoryMagazinesRepository'
import { IMagazineRepository } from '../../repositories/interfaces/IMagazineRepository'
import { CreateMagazine } from '../create-magazine/create-magazine'
import { ListMagazines } from './list-magazine'

let listMagazines: ListMagazines
let createMagazine: CreateMagazine
let magazinesRepository: IMagazineRepository
let themesRepository: IThemeRepository

describe('List magazines', () => {
  const themeData: any = {
    id: uuid(),
    name: 'theme-name',
    description: 'theme-description',
  }

  beforeEach(() => {
    magazinesRepository = new InMemoryMagazinesRepository()
    listMagazines = new ListMagazines(magazinesRepository)
    createMagazine = new CreateMagazine(magazinesRepository)
    themesRepository = new InMemoryThemesRepository()
  })

  test('should list all magazines', async () => {
    await themesRepository.create(themeData)

    const data1 = {
      name: 'magazine-name',
      description: 'magazine-description',
      yearFounded: 2021,
      publicationPeriod: 'ANNUALLY',
      themeId: themeData.id,
    }

    const data2 = {
      name: 'second-magazine-name',
      description: 'second-magazine-description',
      yearFounded: 2021,
      publicationPeriod: 'ANNUALLY',
      themeId: themeData.id,
    }

    const response1 = await createMagazine.execute(data1)
    const magazine1 = response1.value as Magazine

    const response2 = await createMagazine.execute(data2)
    const magazine2 = response2.value as Magazine

    expect(magazine1).toBeTruthy()
    expect(await magazinesRepository.findById(magazine1.id)).toBeTruthy()

    expect(magazine2).toBeTruthy()
    expect(await magazinesRepository.findById(magazine2.id)).toBeTruthy()

    const response = await listMagazines.execute()
    expect(response.length).toBe(2)

    expect(response[0].props.name).toBe(magazine1.props.name)
    expect(response[1].props.name).toBe(magazine2.props.name)
  })

  test('should return an empty list if no magazines exist', async () => {
    const response = await listMagazines.execute()
    expect(response.length).toBe(0)
  })
})
