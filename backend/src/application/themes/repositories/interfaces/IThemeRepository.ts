import { Theme } from '../../domain/theme'

export interface IThemeRepository {
  findById(id: string): Promise<Theme | null>
  create(theme: Theme): Promise<void>
  update(theme: Theme): Promise<void>
  delete(id: string): Promise<void>
  deleteMany(ids: string[]): Promise<void>
  list(): Promise<Theme[]>
}
