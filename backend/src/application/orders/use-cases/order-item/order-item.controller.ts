import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, created } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { CreateOrder } from './order-item'

type CreateOrderControllerRequest = {
  totalValue: number
  status: number
  addressId: string
  paymentMethod: number
  items: {
    id: string
    quantity: number
  }[]
  customerId: string
}

export class CreateOrderController implements Controller {
  constructor(
    private readonly validator: Validator<CreateOrderControllerRequest>,
    private createOrder: CreateOrder
  ) {}

  async handle(request: CreateOrderControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (request.items === undefined || request.items?.length < 1) {
      return clientError(new Error(t('order.items-required')))
    }

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createOrder.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        default:
          return clientError(error)
      }
    }

    return created({ message: t('order.created') })
  }
}
