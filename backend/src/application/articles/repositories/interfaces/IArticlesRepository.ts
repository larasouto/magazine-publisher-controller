import { Article } from '../../domain/article'

export interface IArticlesRepository {
  findById(id: string): Promise<Article | null>
  create(
    article: Article,
    reporters: string[],
    photographers: string[],
  ): Promise<void>
  update(
    article: Article,
    reporters: string[],
    photographers: string[],
  ): Promise<void>
  deleteMany(ids: string[]): Promise<void>
  list(): Promise<Article[]>
}
