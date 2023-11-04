import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { OrderNotFoundError } from './errors/OrderNotFoundError'
import { UpdateStatusOrder } from './update-status-order'

type UpdateStatusOrderControllerRequest = {
  orderId: string
  status: number
}

export class UpdateStatusOrderController implements Controller {
  constructor(
    private readonly validator: Validator<UpdateStatusOrderControllerRequest>,
    private updateStatus: UpdateStatusOrder,
  ) {}

  async handle(
    request: UpdateStatusOrderControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.updateStatus.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case OrderNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({}, { message: 'order.updateStatus' })
  }
}
