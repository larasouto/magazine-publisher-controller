import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { DeleteBookstore } from './delete-bookstore'
import { BookstoreNotFoundError } from './errors/BookstoreNotFoundError'

type DeleteBookstoreControllerRequest = {
  bookstoreId: string
}

export class DeleteBookstoreController implements Controller {
  constructor(
    private readonly validator: Validator<DeleteBookstoreControllerRequest>,
    private deleteBookstore: DeleteBookstore,
  ) {}

  async handle(
    request: DeleteBookstoreControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.deleteBookstore.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case BookstoreNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ message: t('bookstore.deleted') })
  }
}
