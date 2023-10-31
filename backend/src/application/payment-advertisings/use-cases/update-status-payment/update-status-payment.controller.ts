import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'

import { UpdateStatusPaymentAdvertising } from './update-status-payment'
import { PaymentAdvertisingNotFoundError } from '../get-payment-advertising/errors/PaymentAdvertisingNotFoundError'

type UpdateStatusPaymentAdvertisingControllerRequest = {
  paymentAdvertisingId: string
  status: number
}

export class UpdateStatusPaymentAdvertisingController implements Controller {
  constructor(
    private readonly validator: Validator<UpdateStatusPaymentAdvertisingControllerRequest>,
    private updateStatus: UpdateStatusPaymentAdvertising,
  ) {}

  async handle(
    request: UpdateStatusPaymentAdvertisingControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.updateStatus.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case PaymentAdvertisingNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({}, { message: 'paymentAdvertising.updateStatus' })
  }
}
