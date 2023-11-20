import { prismaClient } from '@/infra/prisma/client'
import { Article } from '../../domain/article'
import { ArticleMapper } from '../../mappers/article.mapper'
import { IArticlesRepository } from '../interfaces/IArticlesRepository'

export class PrismaArticlesRepository implements IArticlesRepository {
  async findById(id: string): Promise<Article | null> {
    const article = await prismaClient.article.findUnique({
      where: { id },
    })

    if (!article) {
      return null
    }

    return ArticleMapper.toDomain(article)
  }

  async create(article: Article): Promise<void> {
    const data = await ArticleMapper.toPersistence(article)

    await prismaClient.article.create({
      data,
    })
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.article.deleteMany({
      where: { id: { in: ids } },
    })
  }

  async update(article: Article): Promise<void> {
    const data = await ArticleMapper.toPersistence(article)

    await prismaClient.article.update({
      where: { id: article.id },
      data,
    })
  }

  async list(): Promise<Article[]> {
    const articles = await prismaClient.article.findMany()
    return articles.map(ArticleMapper.toDomain)
  }
}
