import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { CategoryNotFoundError } from './errors/CategoryNotFoundError'
import { GetCategory } from './get-category'

type GetCategoryControllerRequest = {
  categoryId: string
}

export class GetCategoryController implements Controller {
  constructor(
    private readonly validator: Validator<GetCategoryControllerRequest>,
    private getCategory: GetCategory,
  ) {}

  async handle(request: GetCategoryControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.getCategory.execute(request)

    if (result.isLeft()) {
      const error = result.value

      /**
       * Se não houver um erro específico, deixe apenas o
       * 'default' no switch case.
       */
      switch (error.constructor) {
        case CategoryNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ dto: result.value.toResponseBody() })
  }
}
