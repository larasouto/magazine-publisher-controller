import { Category } from '../../domain/category'
import { ICategoryRepository } from '../interfaces/ICategoryRepository'

export class InMemoryCategoriesRepository implements ICategoryRepository {
  constructor(public categories: Category[] = []) {}

  async findById(id: string): Promise<Category | null> {
    const category = this.categories.find((category) => category.id === id)

    if (!category) {
      return null
    }

    return category
  }

  async create(category: Category): Promise<void> {
    this.categories.push(category)
  }

  async delete(id: string): Promise<void> {
    const categoryIndex = this.categories.findIndex(
      (category) => category.id === id,
    )

    this.categories.splice(categoryIndex, 1)
  }

  async deleteMany(ids: string[]): Promise<void> {
    ids.forEach((id) => {
      const categoryIndex = this.categories.findIndex(
        (category) => category.id === id,
      )

      this.categories.splice(categoryIndex, 1)
    })
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
