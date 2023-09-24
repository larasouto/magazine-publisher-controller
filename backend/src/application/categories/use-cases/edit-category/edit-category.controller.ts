import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { EditCategory } from './edit-category'
import { CategoryNotFoundError } from './errors/CategoryNotFoundError'

type EditCategoryControllerRequest = {
  categoryId: string
  name: string
  description?: string
}

export class EditCategoryController implements Controller {
  constructor(
    private readonly validator: Validator<EditCategoryControllerRequest>,
    private editCategory: EditCategory,
  ) {}

  async handle(request: EditCategoryControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.editCategory.execute(request)

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

    return ok({ message: t('category.created') })
  }
}
