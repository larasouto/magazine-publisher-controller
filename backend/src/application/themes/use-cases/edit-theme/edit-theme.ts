import { Either, left, right } from '@/core/logic/either'
import { Theme } from '../../domain/theme'
import { IThemeRepository } from '../../repositories/interfaces/IThemeRepository'
import { ThemeNotFoundError } from './errors/ThemeNotFoundError'

type EditThemeRequest = {
  themeId: string
  name: string
  description?: string
}

type EditThemeResponse = Either<ThemeNotFoundError, Theme>

export class EditTheme {
  constructor(private themesRepository: IThemeRepository) {}

  async execute({
    themeId,
    ...request
  }: EditThemeRequest): Promise<EditThemeResponse> {
    const themeOrError = Theme.create(request, themeId)

    if (themeOrError.isLeft()) {
      return left(themeOrError.value)
    }

    const themeExists = await this.themesRepository.findById(themeId)

    if (!themeExists) {
      return left(new ThemeNotFoundError())
    }

    const theme = themeOrError.value
    await this.themesRepository.update(theme)

    return right(theme)
  }
}
