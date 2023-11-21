import { PrismaArticlesRepository } from '@/application/articles/repositories/prisma/PrismaArticlesRepository'
import { EditArticle } from '@/application/articles/use-cases/edit-article/edit-article'
import { EditArticleController } from '@/application/articles/use-cases/edit-article/edit-article.controller'
import { PrismaCategoriesRepository } from '@/application/categories/repositories/prisma/PrismaCategoriesRepository'
import { PrismaEditionsRepository } from '@/application/editions/repositories/prisma/PrismaEditionsRepository'
import { PrismaThemesRepository } from '@/application/themes/repositories/prisma/PrismaThemesRepository'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeEditArticlesController(): Controller {
  const prismaArticlesRepository = new PrismaArticlesRepository()
  const prismaEditionsRepository = new PrismaEditionsRepository()
  const prismaThemesRepository = new PrismaThemesRepository()
  const prismaCategoriesRepository = new PrismaCategoriesRepository()

  const useCaseEditArticle = new EditArticle(
    prismaArticlesRepository,
    prismaThemesRepository,
    prismaCategoriesRepository,
    prismaEditionsRepository,
  )

  const validator = new ValidatorCompositor([])

  return new EditArticleController(validator, useCaseEditArticle)
}
