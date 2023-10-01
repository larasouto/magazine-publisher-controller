import { Either, left, right } from '@/core/logic/either'
import { Category } from '../../domain/category'
import { ICategoryRepository } from '../../repositories/interfaces/ICategoryRepository'
import { CategoryNotFoundError } from './errors/CategoryNotFoundError'

type EditCategoryRequest = {
  categoryId: string
  name: string
  description?: string
}

type EditCategoryResponse = Either<CategoryNotFoundError, Category>

export class EditCategory {
  constructor(private categoriesRepository: ICategoryRepository) {}

  async execute({
    categoryId,
    ...request
  }: EditCategoryRequest): Promise<EditCategoryResponse> {
    const categoryOrError = Category.create(request, categoryId)

    if (categoryOrError.isLeft()) {
      return left(categoryOrError.value)
    }

    const categoryExists = await this.categoriesRepository.findById(categoryId)

    if (!categoryExists) {
      return left(new CategoryNotFoundError())
    }

    const category = categoryOrError.value
    await this.categoriesRepository.update(category)

    return right(category)
  }
}
