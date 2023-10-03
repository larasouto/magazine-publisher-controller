import { Either, left, right } from '@/core/logic/either'
import { ICategoryRepository } from '../../repositories/interfaces/ICategoryRepository'
import { CategoryNotFoundError } from './errors/CategoryNotFoundError'
import { prismaClient } from '@/infra/prisma/client'

type DeleteCategoryRequest = {
  categoryId: string
}

type DeleteCategoryResponse = Either<CategoryNotFoundError, null>

export class DeleteCategory {
  constructor(private categoriesRepository: ICategoryRepository) {}

  async execute({
    categoryId,
  }: DeleteCategoryRequest): Promise<DeleteCategoryResponse> {
    const categoryExists = await this.categoriesRepository.findById(categoryId)

    if (!categoryExists) {
      return left(new CategoryNotFoundError())
    }

    await prismaClient.category.delete({
      where: { id: categoryId },
    })
    // await this.categoriesRepository.delete(categoryId)

    return right(null)
  }
}
