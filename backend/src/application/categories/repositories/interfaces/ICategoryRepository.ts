import { Category } from '../../domain/category'

export interface ICategoryRepository {
  findById(id: string): Promise<Category | null>
  list(): Promise<(Category | null)[]>
  create(category: Category): Promise<void>
  update(category: Category): Promise<void>
  deleteMany(ids: string[]): Promise<void>
}
