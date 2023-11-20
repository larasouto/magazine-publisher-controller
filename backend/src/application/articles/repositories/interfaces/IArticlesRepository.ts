import { Article } from '../../domain/article'

export interface IArticlesRepository {
  findById(id: string): Promise<Article | null>
  create(article: Article): Promise<void>
  update(article: Article): Promise<void>
  deleteMany(ids: string[]): Promise<void>
  list(): Promise<Article[]>
}
