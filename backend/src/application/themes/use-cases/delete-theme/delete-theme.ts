import { Either, left, right } from '@/core/logic/either'
import { IThemeRepository } from '../../repositories/interfaces/IThemeRepository'
import { ThemeNotFoundError } from './errors/ThemeNotFoundError'

type DeleteThemeRequest = {
  themeId: string
}

type DeleteThemeResponse = Either<ThemeNotFoundError, null>

export class DeleteTheme {
  constructor(private themesRepository: IThemeRepository) {}

  async execute({ themeId }: DeleteThemeRequest): Promise<DeleteThemeResponse> {
    const themeExists = await this.themesRepository.findById(themeId)

    if (!themeExists) {
      return left(new ThemeNotFoundError())
    }

    await this.themesRepository.delete(themeId)

    return right(null)
  }
}
