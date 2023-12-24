import { Controller } from '@/core/infra/controller'
import {
  HttpResponse,
  clientError,
  fail,
  notFound,
  ok,
} from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { DeleteArticle } from './delete-article'
import { ArticleNotFoundError } from './errors/ArticleNotFoundError'
import { OneOrMoreArticleNotFoundError } from './errors/OneOrMoreArticleNotFoundError'

type DeleteArticleControllerRequest = {
  ids: string[]
}

export class DeleteArticleController implements Controller {
  constructor(
    private readonly validator: Validator<DeleteArticleControllerRequest>,
    private deleteArticle: DeleteArticle,
  ) {}

  async handle(request: DeleteArticleControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.deleteArticle.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ArticleNotFoundError:
        case OneOrMoreArticleNotFoundError:
          return notFound(error)
        default:
          return clientError(error)
      }
    }

    return ok({ message: 'Reportagem deletada com sucesso' })
  }
}
