import { PrismaArticlesRepository } from '@/application/articles/repositories/prisma/PrismaArticlesRepository'
import { GetArticle } from '@/application/articles/use-cases/get-article/get-article'
import { GetArticleController } from '@/application/articles/use-cases/get-article/get-article.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeGetArticleController(): Controller {
  const prismaArticlesRepository = new PrismaArticlesRepository()
  const useCaseGetArticle = new GetArticle(prismaArticlesRepository)

  const validator = new ValidatorCompositor([])

  return new GetArticleController(validator, useCaseGetArticle)
}
