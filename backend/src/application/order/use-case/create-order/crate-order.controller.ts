import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, created } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { CreateOrder } from './create-order'
import { Status } from '../../domain/order.schema'

type CreateOrderControllerRequest = {
  receiptDate: Date
  departureDate: Date
  status: Status
  deliveryAddress: string
  exampleNumber: number
  price: number
  editonId: string
  graphicsDistributorId: string
}

export class CreateOrderController implements Controller {
  constructor(
    private readonly validator: Validator<CreateOrderControllerRequest>,
    private createOrder: CreateOrder,
  ) {}

  async handle(request: CreateOrderControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

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
