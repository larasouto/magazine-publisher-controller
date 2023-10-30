import { PrismaCategoriesRepository } from '@/application/categories/repositories/prisma/PrismaCategoriesRepository'
import { DeleteCategory } from '@/application/categories/use-cases/delete-category/delete-category'
import { DeleteCategoryController } from '@/application/categories/use-cases/delete-category/delete-category.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeDeleteCategoriesController(): Controller {
  const prismaCategoriesRepository = new PrismaCategoriesRepository()
  const useCaseDeleteCategory = new DeleteCategory(prismaCategoriesRepository)

  const validator = new ValidatorCompositor([])

  return new DeleteCategoryController(validator, useCaseDeleteCategory)
}
