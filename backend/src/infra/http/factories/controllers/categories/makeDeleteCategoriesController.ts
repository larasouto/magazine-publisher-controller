import { PrismaCategoriesRepository } from '@/application/categories/repositories/prisma/PrismaCategoriesRepository'
import { DeleteCategory } from '@/application/categories/use-cases/delete-category/delete-category'
import { DeleteCategoryController } from '@/application/categories/use-cases/delete-category/delete-category.controller'
import { Controller } from '@/core/infra/controller'
import { RequiredFieldsValidator } from '@/infra/validation/RequiredFieldsValidator'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

type RequiredFields = {
  categoryId: string
}

export function makeDeleteCategoriesController(): Controller {
  const prismaCategoriesRepository = new PrismaCategoriesRepository()
  const useCaseDeleteCategory = new DeleteCategory(prismaCategoriesRepository)

  const validator = new ValidatorCompositor<RequiredFields>([
    new RequiredFieldsValidator(),
  ])

  return new DeleteCategoryController(validator, useCaseDeleteCategory)
}
