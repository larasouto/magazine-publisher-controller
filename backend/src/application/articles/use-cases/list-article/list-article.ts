import { Article } from '../../domain/article'
import { IArticlesRepository } from '../../repositories/interfaces/IArticlesRepository'

type ListArticlesResponse = Article[]

export class ListArticles {
  constructor(private articlesRepository: IArticlesRepository) {}

  async execute(): Promise<ListArticlesResponse> {
    const articles = await this.articlesRepository.list()
    return articles
  }
}
