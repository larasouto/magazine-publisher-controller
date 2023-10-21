import { Either, left, right } from '@/core/logic/either'
import { Theme } from '../../domain/theme'
import { IThemeRepository } from '../../repositories/interfaces/IThemeRepository'

type CreateThemeRequest = {
  name: string
  description?: string
}

type CreateThemeResponse = Either<Error, Theme>

export class CreateTheme {
  constructor(private themesRepository: IThemeRepository) {}

  async execute(request: CreateThemeRequest): Promise<CreateThemeResponse> {
    const themeOrError = Theme.create(request)

    if (themeOrError.isLeft()) {
      return left(themeOrError.value)
    }

    const theme = themeOrError.value
    await this.themesRepository.create(theme)

    return right(theme)
  }
}
