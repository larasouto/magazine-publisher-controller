import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { EditBookstore } from './edit-bookstore'
import { BookstoreNotFoundError } from './errors/BookstoreNotFoundError'

type EditbookstoreControllerRequest = {
  bookstoreId: string
  address: string
}

export class EditbookstoreController implements Controller {
  constructor(
    private readonly validator: Validator<EditbookstoreControllerRequest>,
    private editbookstore: EditBookstore,
  ) {}

  async handle(request: EditbookstoreControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.editbookstore.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case BookstoreNotFoundError
        :
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ message: t('bookstore.updated') })
  }
}
