import { Either, left, right } from '@/core/logic/either'
import { Article } from '../../domain/article'
import { IArticlesRepository } from '../../repositories/interfaces/IArticlesRepository'
import { ThemeNotFoundError } from './errors/ThemeNotFoundError'
import { CategoryNotFoundError } from '@/application/categories/use-cases/delete-category/errors/CategoryNotFoundError'
import { EditionNotFoundError } from './errors/EditionNotFoundError'
import { ArticleItemsSchema } from '../../domain/article.schema'
import { IEditionRepository } from '@/application/editions/repositories/interfaces/IEditionRepository'
import { IThemeRepository } from '@/application/themes/repositories/interfaces/IThemeRepository'
import { ICategoryRepository } from '@/application/categories/repositories/interfaces/ICategoryRepository'

type CreateArticleRequest = {
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

type CreateArticleResponse = Either<Error, Article>

export class CreateArticle {
  constructor(
    private articlesRepository: IArticlesRepository,
    private editionsRepository: IEditionRepository,
    private themesRepository: IThemeRepository,
    private categoriesRepository: ICategoryRepository,
  ) {}

  async execute(request: CreateArticleRequest): Promise<CreateArticleResponse> {
    const articleOrError = Article.create(request)
    const articleItemsOrError = ArticleItemsSchema.safeParse(request)

    if (articleOrError.isLeft()) {
      return left(articleOrError.value)
    }

    if (!articleItemsOrError.success) {
      return left(new Error('Fotógrafos e Repórteres são obrigatórios'))
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

    const editionExists = await this.editionsRepository.findById(
      request.editionId,
    )

    if (!editionExists) {
      return left(new EditionNotFoundError())
    }

    const article = articleOrError.value
    await this.articlesRepository.create(
      article,
      request.reporters,
      request.photographers,
    )

    return right(article)
  }
}
