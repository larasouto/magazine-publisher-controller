import { Article } from '../../domain/article'
import { IArticlesRepository } from '../interfaces/IArticlesRepository'

export class InMemoryArticlesRepository implements IArticlesRepository {
  constructor(public articles: Article[] = []) {}

  async findById(id: string): Promise<Article | null> {
    const article = this.articles.find((article) => article.id === id)

    if (!article) {
      return null
    }

    return article
  }

  async create(article: Article): Promise<void> {
    this.articles.push(article)
  }

  async deleteMany(ids: string[]): Promise<void> {
    ids.forEach((id) => {
      const articleIndex = this.articles.findIndex((article) => article.id === id)

      this.articles.splice(articleIndex, 1)
    })
  }

  async update(article: Article): Promise<void> {
    const articleIndex = this.articles.findIndex((article) => article.id === article.id)

    this.articles[articleIndex] = article
  }

  async list(): Promise<Article[]> {
    return this.articles
  }
}
