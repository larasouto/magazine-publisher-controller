import { beforeEach, describe, expect, test } from 'vitest'
import { Theme } from '../../domain/theme'
import { InMemoryThemesRepository } from '../../repositories/in-memory/InMemoryThemesRepository'
import { IThemeRepository } from '../../repositories/interfaces/IThemeRepository'
import { CreateTheme } from './create-theme'

let themesRepository: IThemeRepository
let createTheme: CreateTheme

describe('Create a theme', () => {
  beforeEach(() => {
    themesRepository = new InMemoryThemesRepository()
    createTheme = new CreateTheme(themesRepository)
  })

  test('should be able to create a theme', async () => {
    const data: any = {
      name: 'theme-name',
      description: 'theme-description',
    }

    const response = await createTheme.execute(data)
    const theme = response.value as Theme

    expect(theme).toBeTruthy()
    expect(await themesRepository.findById(theme.id)).toBeTruthy()
  })

  test('should be able to create a theme without description', async () => {
    const data: any = {
      name: 'theme-name',
    }

    const response = await createTheme.execute(data)
    const theme = response.value as Theme

    expect(theme).toBeTruthy()
    expect(await themesRepository.findById(theme.id)).toBeTruthy()
  })

  test('should not be able to create a theme with empty data', async () => {
    const data: any = {}

    const response = await createTheme.execute(data)
    expect(response.isLeft()).toBeTruthy()
  })

  test('should not be able to create a theme without name', async () => {
    const data: any = {
      description: 'theme-description',
    }

    const response = await createTheme.execute(data)
    expect(response.isLeft()).toBeTruthy()
  })
})
