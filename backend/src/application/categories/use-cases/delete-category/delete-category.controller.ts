import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, fail, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { DeleteCategory } from './delete-category'
import { CategoryNotFoundError } from './errors/CategoryNotFoundError'
import { OneOrMoreCategoryNotFoundError } from './errors/OneOrMoreCategoryNotFoundError'

type DeleteCategoryControllerRequest = {
  ids: string[]
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
        case OneOrMoreCategoryNotFoundError:
          return clientError(error)
        default:
          return clientError(error)
      }
    }

    const message =
      request.ids?.length > 1
        ? t('category.deleted_many')
        : t('category.deleted')

    return ok({ message })
  }
}
