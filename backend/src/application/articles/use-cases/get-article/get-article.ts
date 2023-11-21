import { Either, left, right } from '@/core/logic/either'
import { Article } from '../../domain/article'
import { IArticlesRepository } from '../../repositories/interfaces/IArticlesRepository'
import { ArticleNotFoundError } from './errors/ArticleNotFoundError'

type GetArticleRequest = {
  articleId: string
}

type GetArticleResponse = Either<ArticleNotFoundError, Article>

export class GetArticle {
  constructor(private articlesRepository: IArticlesRepository) {}

  async execute({ articleId }: GetArticleRequest): Promise<GetArticleResponse> {
    const article = await this.articlesRepository.findById(articleId)

    if (!article) {
      return left(new ArticleNotFoundError())
    }

    return right(article)
  }
}
