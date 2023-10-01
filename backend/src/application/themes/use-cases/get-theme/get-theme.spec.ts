import { InMemoryThemesRepository } from '@/application/themes/repositories/in-memory/InMemoryThemesRepository'
import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { IThemeRepository } from '../../repositories/interfaces/IThemeRepository'
import { GetTheme } from './get-theme'

let themesRepository: IThemeRepository
let getTheme: GetTheme

describe('Get a theme', () => {
  beforeEach(() => {
    themesRepository = new InMemoryThemesRepository()
    getTheme = new GetTheme(themesRepository)
  })

  test('should be able to get a theme', async () => {
    const data: any = {
      id: uuid(),
      name: 'theme-name',
      description: 'theme-description',
    }

    await themesRepository.create(data)
    const theme = await getTheme.execute({ themeId: data.id })

    expect(theme.isRight()).toBeTruthy()
  })

  test('should not be able to get a non existing theme', async () => {
    const theme = await getTheme.execute({ themeId: 'random-id' })

    expect(theme.isLeft()).toBeTruthy()
  })
})
