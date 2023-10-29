import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { GetOrder } from './get-order'
import { OrderNotFoundError } from './errors/OrderNotFoundError'

type GetOrderControllerRequest = {
  orderId: string
}

export class GetOrderController implements Controller {
  constructor(
    private readonly validator: Validator<GetOrderControllerRequest>,
    private getOrder: GetOrder,
  ) {}

  async handle(request: GetOrderControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.getOrder.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case OrderNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ dto: result.value })
  }
}
