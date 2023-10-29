import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, created } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { CreateOrderReturn } from './create-orderReturn'

type CreateOrderReturnControllerRequest = {
  returnDate: Date
  returnNumber: number
  orderId: string
}

export class CreateOrderReturnController implements Controller {
  constructor(
    private readonly validator: Validator<CreateOrderReturnControllerRequest>,
    private createOrderReturn: CreateOrderReturn,
  ) {}

  async handle(
    request: CreateOrderReturnControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result =
      await this.createOrderReturn.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        default:
          return clientError(error)
      }
    }

    return created({ message: t('orderReturn.created') })
  }
}
