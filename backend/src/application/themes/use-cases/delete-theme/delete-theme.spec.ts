import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { Theme } from '../../domain/theme'
import { InMemoryThemesRepository } from '../../repositories/in-memory/InMemoryThemesRepository'
import { IThemeRepository } from '../../repositories/interfaces/IThemeRepository'
import { DeleteTheme } from './delete-theme'
import { ThemeFactory } from '@/tests/factories/ThemeFactory'

let categoriesRepository: IThemeRepository
let deleteTheme: DeleteTheme

describe('Delete theme', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryThemesRepository()
    deleteTheme = new DeleteTheme(categoriesRepository)
  })

  test('should delete a theme', async () => {
    const theme1 = ThemeFactory.create()
    const theme2 = ThemeFactory.create()

    await categoriesRepository.create(theme1)
    await categoriesRepository.create(theme2)

    const response = await deleteTheme.execute({
      themeId: [theme1.id, theme2.id],
    })

    expect(response.isRight()).toBeTruthy()
    expect(await categoriesRepository.list()).toStrictEqual([])
  })

  test('should not delete a non-existing theme', async () => {
    const theme1 = ThemeFactory.create()
    await categoriesRepository.create(theme1)

    const response = await deleteTheme.execute({
      themeId: [theme1.id, 'non-existing-id'],
    })

    expect(response.isLeft()).toBeTruthy()
    expect(await categoriesRepository.list()).toStrictEqual([theme1])
  })
})
