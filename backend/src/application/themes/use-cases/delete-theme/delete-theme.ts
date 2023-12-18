import { Either, left, right } from '@/core/logic/either'
import { IThemeRepository } from '../../repositories/interfaces/IThemeRepository'
import { OneOrMoreThemeNotFoundError } from './errors/OneOrMoreThemeNotFoundError'
import { ThemeNotFoundError } from './errors/ThemeNotFoundError'

type DeleteThemeRequest = {
  ids: string[]
}

type DeleteThemeResponse = Either<ThemeNotFoundError, null>

export class DeleteTheme {
  constructor(private themesRepository: IThemeRepository) {}

  async execute({ ids }: DeleteThemeRequest): Promise<DeleteThemeResponse> {
    const themeOrThemes = Array.isArray(ids) ? ids : [ids]

    const themePromises = themeOrThemes
      .filter((ids) => ids)
      .map((ids) => this.themesRepository.findById(ids))

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
