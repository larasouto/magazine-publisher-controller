import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, created } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { CreateCategory } from './create-category'

type CreateCategoryControllerRequest = {
  name: string
  description?: string
}

export class CreateCategoryController implements Controller {
  constructor(
    private readonly validator: Validator<CreateCategoryControllerRequest>,
    private createCategory: CreateCategory,
  ) {}

  async handle(
    request: CreateCategoryControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createCategory.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        default:
          return clientError(error)
      }
    }

    return created({ message: t('category.created') })
  }
}
