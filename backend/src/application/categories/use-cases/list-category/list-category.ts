import { Category } from '../../domain/category'
import { ICategoryRepository } from '../../repositories/interfaces/ICategoryRepository'

type ListCategoryResponse = (Category | null)[]

export class ListCategory {
  constructor(private categoriesRepository: ICategoryRepository) {}

  async execute(): Promise<ListCategoryResponse> {
    const category = await this.categoriesRepository.list()
    return category
  }
}
