import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, created } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { CreateArticle } from './create-article'
import { ThemeNotFoundError } from './errors/ThemeNotFoundError'
import { CategoryNotFoundError } from './errors/CategoryNotFoundError'
import { EditionNotFoundError } from './errors/EditionNotFoundError'

type CreateArticleControllerRequest = {
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

export class CreateArticleController implements Controller {
  constructor(
    private readonly validator: Validator<CreateArticleControllerRequest>,
    private createArticle: CreateArticle,
  ) {}

  async handle(request: CreateArticleControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createArticle.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ThemeNotFoundError:
        case CategoryNotFoundError:
        case EditionNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return created({ message: t('item.created') })
  }
}
