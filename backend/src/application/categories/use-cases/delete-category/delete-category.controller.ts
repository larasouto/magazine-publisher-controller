import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { DeleteCategory } from './delete-category'
import { CategoryNotFoundError } from './errors/CategoryNotFoundError'

type DeleteCategoryControllerRequest = {
  categoryId: string
}

export class DeleteCategoryController implements Controller {
  constructor(
    private readonly validator: Validator<DeleteCategoryControllerRequest>,
    private deleteCategory: DeleteCategory,
  ) {}

  async handle(
    request: DeleteCategoryControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.deleteCategory.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case CategoryNotFoundError:
          return clientError(error)
        default:
          return clientError(error)
      }
    }

    return ok({ message: t('category.deleted') })
  }
}
