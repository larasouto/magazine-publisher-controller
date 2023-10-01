import { Either, left, right } from '@/core/logic/either'
import { Category } from '../../domain/category'
import { ICategoryRepository } from '../../repositories/interfaces/ICategoryRepository'
import { CategoryNotFoundError } from './errors/CategoryNotFoundError'

type GetCategoryRequest = {
  categoryId: string
}

type GetCategoryResponse = Either<CategoryNotFoundError, Category>

export class GetCategory {
  constructor(private categoriesRepository: ICategoryRepository) {}

  async execute({
    categoryId,
  }: GetCategoryRequest): Promise<GetCategoryResponse> {
    const category = await this.categoriesRepository.findById(categoryId)

    if (!category) {
      return left(new CategoryNotFoundError())
    }

    return right(category)
  }
}
