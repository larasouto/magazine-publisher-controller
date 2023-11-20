import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { EditArticle } from './edit-article'
import { ArticleNotFoundError } from './errors/ArticleNotFoundError'
import { CategoryNotFoundError } from './errors/CategoryNotFoundError'
import { EditionNotFoundError } from './errors/EditionNotFoundError'
import { ThemeNotFoundError } from './errors/ThemeNotFoundError'

type EditArticleControllerRequest = {
  articleId: string
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
}

export class EditArticleController implements Controller {
  constructor(
    private readonly validator: Validator<EditArticleControllerRequest>,
    private editArticle: EditArticle,
  ) {}

  async handle(request: EditArticleControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.editArticle.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ArticleNotFoundError:
        case CategoryNotFoundError:
        case EditionNotFoundError:
        case ThemeNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ message: t('article.updated') })
  }
}
