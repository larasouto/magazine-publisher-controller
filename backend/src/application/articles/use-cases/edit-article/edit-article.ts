import { Either, left, right } from '@/core/logic/either'
import { Article } from '../../domain/article'
import { IArticlesRepository } from '../../repositories/interfaces/IArticlesRepository'
import { ArticleNotFoundError } from './errors/ArticleNotFoundError'
import { IThemeRepository } from '@/application/themes/repositories/interfaces/IThemeRepository'
import { ICategoryRepository } from '@/application/categories/repositories/interfaces/ICategoryRepository'
import { IEditionRepository } from '@/application/editions/repositories/interfaces/IEditionRepository'
import { CategoryNotFoundError } from './errors/CategoryNotFoundError'
import { ThemeNotFoundError } from './errors/ThemeNotFoundError'
import { EditionNotFoundError } from './errors/EditionNotFoundError'

type EditArticleRequest = {
  articleId: string
  imagePath: string
  title: string
  subtitle: string
  text: string
  editionId: string
  categoryId: string
  themeId: string
  numberOfPages: number
  initialPage: number
  finalPage: number
  reporters: string[]
  photographers: string[]
  isTopSeller: boolean
}

type EditArticleResponse = Either<ArticleNotFoundError, Article>

export class EditArticle {
  constructor(
    private articlesRepository: IArticlesRepository,
    private themesRepository: IThemeRepository,
    private categoriesRepository: ICategoryRepository,
    private editionRepository: IEditionRepository,
  ) {}

  async execute({
    articleId,
    ...request
  }: EditArticleRequest): Promise<EditArticleResponse> {
    const articleOrError = Article.create(request, articleId)

    if (articleOrError.isLeft()) {
      return left(articleOrError.value)
    }

    const themeExists = await this.themesRepository.findById(request.themeId)

    if (!themeExists) {
      return left(new ThemeNotFoundError())
    }

    const categoryExists = await this.categoriesRepository.findById(
      request.categoryId,
    )

    if (!categoryExists) {
      return left(new CategoryNotFoundError())
    }

    const editionExists = await this.editionRepository.findById(
      request.editionId,
    )

    if (!editionExists) {
      return left(new EditionNotFoundError())
    }

    const articleExists = await this.articlesRepository.findById(articleId)

    if (!articleExists) {
      return left(new ArticleNotFoundError())
    }

    const article = articleOrError.value
    await this.articlesRepository.update(
      article,
      request.reporters,
      request.photographers,
    )

    return right(article)
  }
}
