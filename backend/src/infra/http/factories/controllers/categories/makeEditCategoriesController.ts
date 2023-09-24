import { PrismaCategoriesRepository } from '@/application/categories/repositories/prisma/PrismaCategoriesRepository'
import { EditCategory } from '@/application/categories/use-cases/edit-category/edit-category'
import { EditCategoryController } from '@/application/categories/use-cases/edit-category/edit-category.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeEditCategoriesController(): Controller {
  const prismaCategoriesRepository = new PrismaCategoriesRepository()
  const useCaseEditCategory = new EditCategory(prismaCategoriesRepository)

  const validator = new ValidatorCompositor([])

  return new EditCategoryController(validator, useCaseEditCategory)
}
