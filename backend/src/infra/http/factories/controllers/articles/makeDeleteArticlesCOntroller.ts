import { PrismaArticlesRepository } from '@/application/articles/repositories/prisma/PrismaArticlesRepository'
import { DeleteArticle } from '@/application/articles/use-cases/delete-article/delete-article'
import { DeleteArticleController } from '@/application/articles/use-cases/delete-article/delete-article.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeDeleteArticlesController(): Controller {
  const prismaArticlesRepository = new PrismaArticlesRepository()
  const useCaseDeleteArticle = new DeleteArticle(prismaArticlesRepository)

  const validator = new ValidatorCompositor([])

  return new DeleteArticleController(validator, useCaseDeleteArticle)
}
