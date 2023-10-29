import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { OrderReturnNotFoundError } from './errors/OrderReturnNotFoundError'
import { GetOrderReturn } from './get-orderReturn'

type GetOrderReturnControllerRequest = {
  orderReturnId: string
}

export class GetOrderReturnController implements Controller {
  constructor(
    private readonly validator: Validator<GetOrderReturnControllerRequest>,
    private getOrderReturn: GetOrderReturn,
  ) {}

  async handle(
    request: GetOrderReturnControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.getOrderReturn.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case OrderReturnNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ dto: result.value })
  }
}
