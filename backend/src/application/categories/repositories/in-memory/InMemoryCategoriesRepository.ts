import { Category } from '../../domain/category'
import { ICategoryRepository } from '../interfaces/ICategoryRepository'

export class InMemoryCategoriesRepository implements ICategoryRepository {
  constructor(public categories: Category[] = []) {}

  async findById(id: string): Promise<Category | null> {
    const category = this.categories.find((category) => category.id === id)
    return category ?? null
  }

  async create(category: Category): Promise<void> {
    this.categories.push(category)
  }

  async deleteMany(ids: string[]): Promise<void> {
    this.categories = this.categories.filter(
      (category) => !ids.includes(category.id),
    )
  }

  async update(category: Category): Promise<void> {
    const categoryIndex = this.categories.findIndex(
      (category) => category.id === category.id,
    )

    this.categories[categoryIndex] = category
  }

  async list(): Promise<Category[]> {
    return this.categories
  }
}
