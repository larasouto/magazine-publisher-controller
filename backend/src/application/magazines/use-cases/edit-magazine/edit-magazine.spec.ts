import { v4 as uuid } from 'uuid'
import { beforeAll, describe, expect, test } from 'vitest'
import { InMemoryMagazinesRepository } from '../../repositories/in-memory/InMemoryMagazinesRepository'
import { IMagazineRepository } from '../../repositories/interfaces/IMagazineRepository'
import { EditMagazine } from './edit-magazine'

let magazinesRepository: IMagazineRepository
let editMagazine: EditMagazine

describe('Create a magazine', () => {
  beforeAll(() => {
    magazinesRepository = new InMemoryMagazinesRepository()
    editMagazine = new EditMagazine(magazinesRepository)
  })

  test('should be able to update a magazine', async () => {
    const themeData: any = {
      id: uuid(),
      name: 'theme-name',
      description: 'theme-description',
    }

    const data: any = {
      id: uuid(),
      name: 'magazine-name',
      description: 'magazine-description',
      yearFounded: 2021,
      publicationPeriod: 'ANNUALLY',
      themeId: themeData.id,
    }

    await magazinesRepository.create(data)
    expect(await magazinesRepository.findById(data.id)).toBeTruthy()

    const updatedMagazine = await editMagazine.execute({
      magazineId: data.id,
      name: 'magazine-name-updated',
      description: 'magazine-description-updated',
      yearFounded: 2021,
      publicationPeriod: 'ANNUALLY',
      themeId: themeData.id,
    })
    expect(updatedMagazine.isRight()).toBeTruthy()

    const magazine = await magazinesRepository.findById(data.id)
    expect(magazine).toEqual(updatedMagazine.value)
  })

  test('should be able to update only the name in a magazine', async () => {
    const themeData: any = {
      id: uuid(),
      name: 'theme-name',
      description: 'theme-description',
    }

    const data: any = {
      id: uuid(),
      name: 'magazine-name',
      description: 'magazine-description',
      yearFounded: 2021,
      publicationPeriod: 'ANNUALLY',
      themeId: themeData.id,
    }

    await magazinesRepository.create(data)
    expect(await magazinesRepository.findById(data.id)).toBeTruthy()

    const updatedMagazine = await editMagazine.execute({
      magazineId: data.id,
      name: 'magazine-name-updated',
      description: 'magazine-description',
      yearFounded: 2021,
      publicationPeriod: 'ANNUALLY',
      themeId: themeData.id,
    })
    expect(updatedMagazine.isRight()).toBeTruthy()

    const magazine = await magazinesRepository.findById(data.id)
    expect(magazine).toEqual(updatedMagazine.value)
  })

  test('should be able to update only the description in a magazine', async () => {
    const themeData: any = {
      id: uuid(),
      name: 'theme-name',
      description: 'theme-description',
    }

    const data: any = {
      id: uuid(),
      name: 'magazine-name',
      description: 'magazine-description',
      yearFounded: 2021,
      publicationPeriod: 'ANNUALLY',
      themeId: themeData.id,
    }

    await magazinesRepository.create(data)
    expect(await magazinesRepository.findById(data.id)).toBeTruthy()

    const updatedMagazine = await editMagazine.execute({
      magazineId: data.id,
      name: 'test-magazine',
      description: 'test-magazine-description-updated',
      yearFounded: 2021,
      publicationPeriod: 'ANNUALLY',
      themeId: themeData.id,
    })
    expect(updatedMagazine.isRight()).toBeTruthy()

    const magazine = await magazinesRepository.findById(data.id)
    expect(magazine).toEqual(updatedMagazine.value)
  })

  test('should not be able to update a magazine with invalid data', async () => {
    const themeData: any = {
      id: uuid(),
      name: 'theme-name',
      description: 'theme-description',
    }

    const data: any = {
      id: uuid(),
      name: 'magazine-name',
      description: 'magazine-description',
      yearFounded: 2021,
      publicationPeriod: 'ANNUALLY',
      themeId: themeData.id,
    }

    await magazinesRepository.create(data)
    expect(await magazinesRepository.findById(data.id)).toBeTruthy()

    const updatedMagazine = await editMagazine.execute({
      magazineId: data.id,
      name: '',
      description: '',
      yearFounded: 1000,
      publicationPeriod: 'INVALID',
      themeId: 'invalid-id',
    })
    expect(updatedMagazine.isLeft()).toBeTruthy()
  })
})
