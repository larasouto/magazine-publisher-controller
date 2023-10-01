import { v4 as uuid } from 'uuid'
import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryThemesRepository } from '../../repositories/in-memory/InMemoryThemesRepository'
import { IThemeRepository } from '../../repositories/interfaces/IThemeRepository'
import { DeleteTheme } from './delete-theme'

let themesRepository: IThemeRepository
let deleteTheme: DeleteTheme

describe('Delete a theme', () => {
  beforeEach(() => {
    themesRepository = new InMemoryThemesRepository()
    deleteTheme = new DeleteTheme(themesRepository)
  })

  test('should be able to delete a theme', async () => {
    const data: any = {
      id: uuid(),
      name: 'theme-name-delete',
      description: 'theme-description-delete',
    }

    await themesRepository.create(data)
    expect(await themesRepository.findById(data.id)).toBeTruthy()

    const deletedTheme = await deleteTheme.execute({
      themeId: data.id,
    })

    expect(deletedTheme.isRight()).toBeTruthy()
  })

  test('should not be able to delete a non-existing theme', async () => {
    const nonExistingThemeId = 'non-existing-id'

    const nonExistingTheme = await deleteTheme.execute({
      themeId: nonExistingThemeId,
    })

    expect(nonExistingTheme).toBeTruthy()
  })
})
