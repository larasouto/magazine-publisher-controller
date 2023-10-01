import { Theme } from '../../domain/theme'
import { IThemeRepository } from '../interfaces/IThemeRepository'

export class InMemoryThemesRepository implements IThemeRepository {
  constructor(public themes: Theme[] = []) {}

  async findById(id: string): Promise<Theme | null> {
    const theme = this.themes.find((theme) => theme.id === id)

    if (!theme) {
      return null
    }

    return theme
  }

  async create(theme: Theme): Promise<void> {
    this.themes.push(theme)
  }

  async delete(id: string): Promise<void> {
    const themeIndex = this.themes.findIndex((theme) => theme.id === id)

    this.themes.splice(themeIndex, 1)
  }

  async deleteMany(ids: string[]): Promise<void> {
    ids.forEach((id) => {
      const themeIndex = this.themes.findIndex((theme) => theme.id === id)

      this.themes.splice(themeIndex, 1)
    })
  }

  async update(theme: Theme): Promise<void> {
    const themeIndex = this.themes.findIndex((theme) => theme.id === theme.id)

    this.themes[themeIndex] = theme
  }

  async list(): Promise<Theme[]> {
    return this.themes
  }
}
