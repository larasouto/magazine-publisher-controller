import { prismaClient } from '@/infra/prisma/client'
import { Article } from '../../domain/article'
import { ArticleMapper } from '../../mappers/article.mapper'
import { IArticlesRepository } from '../interfaces/IArticlesRepository'

export class PrismaArticlesRepository implements IArticlesRepository {
  async findById(id: string): Promise<Article | null> {
    const article = await prismaClient.article.findUnique({
      where: { id },
      include: {
        reporter_articles: { include: { reporter: true } },
        photographer_articles: { include: { photographer: true } },
      },
    })

    if (!article) {
      return null
    }

    return ArticleMapper.toDomain(
      article,
      article.reporter_articles.map((ra) => ra.reporter.id),
      article.photographer_articles.map((pa) => pa.photographer.id),
    )
  }

  async create(
    article: Article,
    reporters: string[],
    photographers: string[],
  ): Promise<void> {
    const data = await ArticleMapper.toPersistence(article)

    await prismaClient.article.create({
      data: {
        ...data,
        reporter_articles: {
          create: reporters.map((reporter) => ({
            reporter: { connect: { id: reporter } },
          })),
        },
        photographer_articles: {
          create: photographers.map((photographer) => ({
            photographer: { connect: { id: photographer } },
          })),
        },
      },
    })
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.article.deleteMany({
      where: { id: { in: ids } },
    })
  }

  async update(
    article: Article,
    reporters: string[],
    photographers: string[],
  ): Promise<void> {
    const data = await ArticleMapper.toPersistence(article)

    await prismaClient.article.update({
      where: { id: article.id },
      data: {
        ...data,
        reporter_articles: {
          deleteMany: [
            { article_id: article.id },
            { reporter_id: { notIn: reporters } },
          ],
          create: reporters.map((reporter) => ({
            reporter: { connect: { id: reporter } },
          })),
        },
        photographer_articles: {
          deleteMany: [
            { article_id: article.id },
            { photographer_id: { notIn: photographers } },
          ],
          create: photographers.map((photographer) => ({
            photographer: { connect: { id: photographer } },
          })),
        },
      },
    })
  }

  async list(): Promise<Article[]> {
    const articles = await prismaClient.article.findMany()
    return articles.map((article) => ArticleMapper.toDomain(article))
  }
}
