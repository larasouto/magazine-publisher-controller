import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, created } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { Status } from '../../domain/graphicsOrder.schema'
import { CreateGraphicsOrder } from './create-graphicsOrder'

type CreateGraphicsOrderControllerRequest = {
  receiptDate?: Date
  departureDate: Date
  status: Status
  deliveryAddress: string
  exampleNumber: number
  price: number
  editionId: string
  graphicsDistributorId: string
  bookstoreId: string
}

export class CreateGraphicsOrderController implements Controller {
  constructor(
    private readonly validator: Validator<CreateGraphicsOrderControllerRequest>,
    private createGraphicsOrder: CreateGraphicsOrder,
  ) {}

  async handle(
    request: CreateGraphicsOrderControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createGraphicsOrder.execute(request)

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
