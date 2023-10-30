import { Either, left, right } from '@/core/logic/either'
import { IThemeRepository } from '../../repositories/interfaces/IThemeRepository'
import { ThemeNotFoundError } from './errors/ThemeNotFoundError'
import { OneOrMoreThemeNotFoundError } from './errors/OneOrMoreThemeNotFoundError'


type DeleteThemeRequest = {
  themeId: string[]
}

type DeleteThemeResponse = Either<ThemeNotFoundError, null>

export class DeleteTheme {
  constructor(private themesRepository: IThemeRepository) {}

  async execute({
    themeId,
  }: DeleteThemeRequest): Promise<DeleteThemeResponse> {
    const themeOrThemes = Array.isArray(themeId)
      ? themeId
      : [themeId]

    const themePromises = themeOrThemes
      .filter((themeId) => themeId)
      .map((themeId) => this.themesRepository.findById(themeId))

    const themes = await Promise.all(themePromises)

    if (themes.some((theme) => theme === null)) {
      return left(
        themes.length > 1
          ? new OneOrMoreThemeNotFoundError()
          : new ThemeNotFoundError(),
      )
    }

    await this.themesRepository.deleteMany(themeOrThemes)

    return right(null)
  }
}
