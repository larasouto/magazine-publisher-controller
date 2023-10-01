import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryThemesRepository } from '../../repositories/in-memory/InMemoryThemesRepository'
import { IThemeRepository } from '../../repositories/interfaces/IThemeRepository'
import { EditTheme } from './edit-theme'

let themesRepository: IThemeRepository
let editTheme: EditTheme

describe('Create a theme', () => {
  beforeEach(() => {
    themesRepository = new InMemoryThemesRepository()
    editTheme = new EditTheme(themesRepository)
  })

  test('should be able to update a theme', async () => {
    const data: any = {
      id: uuid(),
      name: 'theme-name',
      description: 'theme-description',
    }

    await themesRepository.create(data)
    expect(await themesRepository.findById(data.id)).toBeTruthy()

    const updatedTheme = await editTheme.execute({
      themeId: data.id,
      name: 'theme-name-updated',
      description: 'theme-description-updated',
    })
    expect(updatedTheme.isRight()).toBeTruthy()

    const theme = await themesRepository.findById(data.id)
    expect(theme).toEqual(updatedTheme.value)
  })

  test('should be able to update only the name in a theme', async () => {
    const data: any = {
      id: uuid(),
      name: 'theme-name',
      description: 'theme-description',
    }

    await themesRepository.create(data)
    expect(await themesRepository.findById(data.id)).toBeTruthy()

    const updatedTheme = await editTheme.execute({
      themeId: data.id,
      name: 'theme-name-updated',
      description: 'theme-description',
    })
    expect(updatedTheme.isRight()).toBeTruthy()

    const theme = await themesRepository.findById(data.id)
    expect(theme).toEqual(updatedTheme.value)
  })

  test('should be able to update only the description in a theme', async () => {
    const data: any = {
      id: uuid(),
      name: 'theme-name',
      description: 'theme-description',
    }

    await themesRepository.create(data)
    expect(await themesRepository.findById(data.id)).toBeTruthy()

    const updatedTheme = await editTheme.execute({
      themeId: data.id,
      name: 'test-theme',
      description: 'test-theme-description-updated',
    })
    expect(updatedTheme.isRight()).toBeTruthy()

    const theme = await themesRepository.findById(data.id)
    expect(theme).toEqual(updatedTheme.value)
  })

  test('should not be able to update a theme with invalid data', async () => {
    const data: any = {
      id: uuid(),
      name: 'theme-name',
      description: 'theme-description',
    }

    await themesRepository.create(data)
    expect(await themesRepository.findById(data.id)).toBeTruthy()

    const updatedTheme = await editTheme.execute({
      themeId: data.id,
      name: '',
    })
    expect(updatedTheme.isLeft()).toBeTruthy()
  })
})
