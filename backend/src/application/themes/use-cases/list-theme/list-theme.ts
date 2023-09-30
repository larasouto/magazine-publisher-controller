import { Theme } from '../../domain/theme'
import { IThemeRepository } from '../../repositories/interfaces/IThemeRepository'

type ListThemesResponse = Theme[]

export class ListThemes {
  constructor(private themesRepository: IThemeRepository) {}

  async execute(): Promise<ListThemesResponse> {
    const themes = await this.themesRepository.list()
    return themes
  }
}
