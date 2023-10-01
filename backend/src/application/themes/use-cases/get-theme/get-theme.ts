import { Either, left, right } from '@/core/logic/either'
import { Theme } from '../../domain/theme'
import { IThemeRepository } from '../../repositories/interfaces/IThemeRepository'
import { ThemeNotFoundError } from './errors/ThemeNotFoundError'

type GetThemeRequest = {
  themeId: string
}

type GetThemeResponse = Either<ThemeNotFoundError, Theme>

export class GetTheme {
  constructor(private themesRepository: IThemeRepository) {}

  async execute({ themeId }: GetThemeRequest): Promise<GetThemeResponse> {
    const theme = await this.themesRepository.findById(themeId)

    if (!theme) {
      return left(new ThemeNotFoundError())
    }

    return right(theme)
  }
}
