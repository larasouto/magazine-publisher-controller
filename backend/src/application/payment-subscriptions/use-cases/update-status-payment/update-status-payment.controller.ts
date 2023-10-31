import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { PaymentSubscriptionNotFoundError } from './errors/PaymentSubscriptionNotFoundError'
import { UpdateStatusPaymentSubscription } from './update-status-payment'

type UpdateStatusPaymentSubscriptionControllerRequest = {
  paymentSubscriptionId: string
  status: number
}

export class UpdateStatusPaymentSubscriptionController implements Controller {
  constructor(
    private readonly validator: Validator<UpdateStatusPaymentSubscriptionControllerRequest>,
    private updateStatus: UpdateStatusPaymentSubscription,
  ) {}

  async handle(
    request: UpdateStatusPaymentSubscriptionControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.updateStatus.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case PaymentSubscriptionNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({}, { message: 'paymentSubscription.updateStatus' })
  }
}
