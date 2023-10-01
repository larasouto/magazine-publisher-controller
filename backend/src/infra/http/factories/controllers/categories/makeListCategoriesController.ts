import { PrismaCategoriesRepository } from '@/application/categories/repositories/prisma/PrismaCategoriesRepository'
import { ListCategory } from '@/application/categories/use-cases/list-category/list-category'
import { ListCategoriesController } from '@/application/categories/use-cases/list-category/list-category.controller'
import { Controller } from '@/core/infra/controller'

export function makeListCategoriesController(): Controller {
  const prismaCategoriesRepository = new PrismaCategoriesRepository()
  const useCaseListCategory = new ListCategory(prismaCategoriesRepository)

  return new ListCategoriesController(useCaseListCategory)
}
