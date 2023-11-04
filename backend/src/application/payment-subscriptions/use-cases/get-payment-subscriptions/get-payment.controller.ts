import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { PaymentSubscriptionNotFoundError } from './errors/PaymentSubscriptionNotFoundError'
import { GetPayment } from './get-payment'
import { UserNotFoundError } from './errors/UserNotFoundError'
import { AddressNotFoundError } from './errors/AddressNotFoundError'

type GetPaymentSubscriptionControllerRequest = {
  paymentId: string
  userId: string
}

export class GetPaymentSubscriptionController implements Controller {
  constructor(
    private readonly validator: Validator<GetPaymentSubscriptionControllerRequest>,
    private getPaymentSubscription: GetPayment,
  ) {}

  async handle(
    request: GetPaymentSubscriptionControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.getPaymentSubscription.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserNotFoundError:
        case AddressNotFoundError:
        case PaymentSubscriptionNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ dto: result.value.toResponseBody() })
  }
}
