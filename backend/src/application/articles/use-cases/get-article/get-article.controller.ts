import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { ArticleNotFoundError } from './errors/ArticleNotFoundError'
import { GetArticle } from './get-article'

type GetArticleControllerRequest = {
  articleId: string
}

export class GetArticleController implements Controller {
  constructor(
    private readonly validator: Validator<GetArticleControllerRequest>,
    private getArticle: GetArticle,
  ) {}

  async handle(request: GetArticleControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.getArticle.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ArticleNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ dto: result.value.toResponseBody() })
  }
}
