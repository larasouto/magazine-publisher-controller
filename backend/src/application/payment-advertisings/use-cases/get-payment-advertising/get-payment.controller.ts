import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { PaymentAdvertisingNotFoundError } from './errors/PaymentAdvertisingNotFoundError'
import { GetPayment } from './get-payment'
import { UserNotFoundError } from './errors/UserNotFoundError'
import { AddressNotFoundError } from './errors/AddressNotFoundError'

type GetPaymentAdvertisingControllerRequest = {
  paymentId: string
  userId: string
}

export class GetPaymentAdvertisingController implements Controller {
  constructor(
    private readonly validator: Validator<GetPaymentAdvertisingControllerRequest>,
    private getPaymentAdvertising: GetPayment,
  ) {}

  async handle(
    request: GetPaymentAdvertisingControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.getPaymentAdvertising.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserNotFoundError:
        case AddressNotFoundError:
        case PaymentAdvertisingNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ dto: result.value.toResponseBody() })
  }
}
