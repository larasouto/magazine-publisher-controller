import { Either, left, right } from '@/core/logic/either'
import { ICategoryRepository } from '../../repositories/interfaces/ICategoryRepository'
import { CategoryNotFoundError } from './errors/CategoryNotFoundError'
import { OneOrMoreCategoryNotFoundError } from './errors/OneOrMoreCategoryNotFoundError'

type DeleteCategoryRequest = {
  categoryId: string[]
}

type DeleteCategoryResponse = Either<CategoryNotFoundError, null>

export class DeleteCategory {
  constructor(private categoriesRepository: ICategoryRepository) {}

  async execute({
    categoryId,
  }: DeleteCategoryRequest): Promise<DeleteCategoryResponse> {
    const categoryOrCategories = Array.isArray(categoryId)
      ? categoryId
      : [categoryId]

    const categoryPromises = categoryOrCategories
      .filter((categoryId) => categoryId)
      .map((categoryId) => this.categoriesRepository.findById(categoryId))

    const categories = await Promise.all(categoryPromises)

    if (categories.some((category) => category === null)) {
      return left(
        categories.length > 1
          ? new OneOrMoreCategoryNotFoundError()
          : new CategoryNotFoundError(),
      )
    }

    await this.categoriesRepository.deleteMany(categoryOrCategories)

    return right(null)
  }
}
