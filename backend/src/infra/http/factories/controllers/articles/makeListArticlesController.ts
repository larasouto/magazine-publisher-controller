import { PrismaArticlesRepository } from '@/application/articles/repositories/prisma/PrismaArticlesRepository'
import { ListArticles } from '@/application/articles/use-cases/list-article/list-article'
import { ListArticleController } from '@/application/articles/use-cases/list-article/list-article.controller'
import { Controller } from '@/core/infra/controller'

export function makeListArticlesController(): Controller {
  const prismaArticlesRepository = new PrismaArticlesRepository()
  const useCaseListArticle = new ListArticles(prismaArticlesRepository)

  return new ListArticleController(useCaseListArticle)
}
