import { Either, left, right } from '@/core/logic/either'
import { Category } from '../../domain/category'
import { ICategoryRepository } from '../../repositories/interfaces/ICategoryRepository'

type CreateCategoryRequest = {
  name: string
  description?: string
}

type CreateCategoryResponse = Either<Error, Category>

export class CreateCategory {
  constructor(private categoriesRepository: ICategoryRepository) {}

  async execute(
    request: CreateCategoryRequest,
  ): Promise<CreateCategoryResponse> {
    const categoryOrError = Category.create(request)

    if (categoryOrError.isLeft()) {
      return left(categoryOrError.value)
    }

    const user = categoryOrError.value
    await this.categoriesRepository.create(user)

    return right(user)
  }
}
