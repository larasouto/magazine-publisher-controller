import { PrismaArticlesRepository } from '@/application/articles/repositories/prisma/PrismaArticlesRepository'
import { CreateArticle } from '@/application/articles/use-cases/create-article/create-article'
import { CreateArticleController } from '@/application/articles/use-cases/create-article/create-article.controller'
import { PrismaCategoriesRepository } from '@/application/categories/repositories/prisma/PrismaCategoriesRepository'
import { PrismaEditionsRepository } from '@/application/editions/repositories/prisma/PrismaEditionsRepository'
import { PrismaThemesRepository } from '@/application/themes/repositories/prisma/PrismaThemesRepository'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeCreateArticlesController(): Controller {
  const prismaArticlesRepository = new PrismaArticlesRepository()
  const prismaEditionsRepository = new PrismaEditionsRepository()
  const prismaThemesRepository = new PrismaThemesRepository()
  const prismaCategoriesRepository = new PrismaCategoriesRepository()
  const useCaseCreateArticle = new CreateArticle(
    prismaArticlesRepository,
    prismaEditionsRepository,
    prismaThemesRepository,
    prismaCategoriesRepository,
  )

  const validator = new ValidatorCompositor([])

  return new CreateArticleController(validator, useCaseCreateArticle)
}
