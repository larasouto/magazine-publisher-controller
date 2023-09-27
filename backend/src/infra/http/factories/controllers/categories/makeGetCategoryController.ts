import { PrismaCategoriesRepository } from '@/application/categories/repositories/prisma/PrismaCategoriesRepository'
import { GetCategory } from '@/application/categories/use-cases/get-category/get-category'
import { GetCategoryController } from '@/application/categories/use-cases/get-category/get-category.controller'
import { Controller } from '@/core/infra/controller'
import { RequiredFieldsValidator } from '@/infra/validation/RequiredFieldsValidator'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

type Validate = {
  categoryId: string
}

export function makeGetCategoryController(): Controller {
  const prismaCategoriesRepository = new PrismaCategoriesRepository()
  const useCaseGetCategory = new GetCategory(prismaCategoriesRepository)

  const validator = new ValidatorCompositor<Validate>([
    new RequiredFieldsValidator(),
  ])

  return new GetCategoryController(validator, useCaseGetCategory)
}
