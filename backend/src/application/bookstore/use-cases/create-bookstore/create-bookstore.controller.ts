import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, created } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { CreateBookstore } from './create-bookstore'

type CreateBookstoreControllerRequest = {
  address: string
}

export class CreateBookstoreController implements Controller {
  constructor(
    private readonly validator: Validator<CreateBookstoreControllerRequest>,
    private createBookstore: CreateBookstore,
  ) {}

  async handle(request: CreateBookstoreControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createBookstore.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        default:
          return clientError(error)
      }
    }

    return created({ message: t('booksotre.created') })
  }
}
