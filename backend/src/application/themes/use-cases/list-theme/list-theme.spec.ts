import { beforeEach, describe, expect, test } from 'vitest'
import { Theme } from '../../domain/theme'
import { InMemoryThemesRepository } from '../../repositories/in-memory/InMemoryThemesRepository'
import { IThemeRepository } from '../../repositories/interfaces/IThemeRepository'
import { CreateTheme } from '../create-theme/create-theme'
import { ListThemes } from './list-theme'

let listThemes: ListThemes
let createTheme: CreateTheme
let themesRepository: IThemeRepository

describe('List themes', () => {
  beforeEach(() => {
    themesRepository = new InMemoryThemesRepository()
    listThemes = new ListThemes(themesRepository)
    createTheme = new CreateTheme(themesRepository)
  })

  test('should list all themes', async () => {
    const data1 = {
      name: 'theme-name',
      description: 'theme-description',
    }

    const data2 = {
      name: 'second-theme-name',
      description: 'second-theme-description',
    }

    const response1 = await createTheme.execute(data1)
    const theme1 = response1.value as Theme

    const response2 = await createTheme.execute(data2)
    const theme2 = response2.value as Theme

    expect(theme1).toBeTruthy()
    expect(await themesRepository.findById(theme1.id)).toBeTruthy()

    expect(theme2).toBeTruthy()
    expect(await themesRepository.findById(theme2.id)).toBeTruthy()

    const response = await listThemes.execute()
    expect(response.length).toBe(2)

    expect(response[0].props.name).toBe(theme1.props.name)
    expect(response[1].props.name).toBe(theme2.props.name)
  })

  test('should return an empty list if no themes exist', async () => {
    const response = await listThemes.execute()
    expect(response.length).toBe(0)
  })
})
