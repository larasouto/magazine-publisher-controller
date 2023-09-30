import { PrismaCategoriesRepository } from '@/application/categories/repositories/prisma/PrismaCategoriesRepository'
import { CreateCategory } from '@/application/categories/use-cases/create-category/create-category'
import { CreateCategoryController } from '@/application/categories/use-cases/create-category/create-category.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeCreateCategoriesController(): Controller {
  const prismaCategoriesRepository = new PrismaCategoriesRepository()
  const useCaseCreateCategory = new CreateCategory(prismaCategoriesRepository)

  const validator = new ValidatorCompositor([])

  return new CreateCategoryController(validator, useCaseCreateCategory)
}
