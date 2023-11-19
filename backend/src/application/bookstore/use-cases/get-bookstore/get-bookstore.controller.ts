import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { BookstoreNotFoundError } from './errors/BookstoreNotFoundError'
import { GetBookstore } from './get-bookstore'

type GetBookstoreControllerRequest = {
  bookstoreId: string
}

export class GetBookstoreController implements Controller {
  constructor(
    private readonly validator: Validator<GetBookstoreControllerRequest>,
    private getBookstore: GetBookstore,
  ) {}

  async handle(request: GetBookstoreControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.getBookstore.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case BookstoreNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ dto: result.value })
  }
}
