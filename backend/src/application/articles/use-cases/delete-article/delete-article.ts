import { Either, left, right } from '@/core/logic/either'
import { IArticlesRepository } from '../../repositories/interfaces/IArticlesRepository'
import { ArticleNotFoundError } from './errors/ArticleNotFoundError'
import { OneOrMoreArticleNotFoundError } from './errors/OneOrMoreArticleNotFoundError'

type DeleteArticleRequest = {
  ids: string[]
}

type DeleteArticleResponse = Either<ArticleNotFoundError, null>

export class DeleteArticle {
  constructor(private articlesRepository: IArticlesRepository) {}

  async execute({
    ids: articleId,
  }: DeleteArticleRequest): Promise<DeleteArticleResponse> {
    const articleOrArticles = Array.isArray(articleId) ? articleId : [articleId]

    if (articleOrArticles.length === 0) {
      return left(new ArticleNotFoundError())
    }
    const articlePromises = articleOrArticles
      .filter((articleId) => articleId)
      .map((articleId) => this.articlesRepository.findById(articleId))

    const articles = await Promise.all(articlePromises)

    if (articles.some((article) => article === null)) {
      return left(
        articles.length > 1
          ? new OneOrMoreArticleNotFoundError()
          : new ArticleNotFoundError(),
      )
    }

    await this.articlesRepository.deleteMany(articleOrArticles)

    return right(null)
  }
}
