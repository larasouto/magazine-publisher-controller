import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { EditGraphicsOrder } from './edit-graphicsOrder'
import { Status } from '../../domain/graphicsOrder.schema'
import { GraphicsOrderNotFoundError } from '../get-order/errors/GraphicsOrderNotFoundError'

type EditGraphicsOrderControllerRequest = {
  graphicsOrderId: string
  receiptDate: Date
  departureDate: Date
  status: Status
  deliveryAddress: string
  exampleNumber: number
  price: number
  editionId: string
  graphicsDistributorId: string
  bookstoreId: string
}

export class EditGraphicsOrderController implements Controller {
  constructor(
    private readonly validator: Validator<EditGraphicsOrderControllerRequest>,
    private editGraphicsOrder: EditGraphicsOrder,
  ) {}

  async handle(request: EditGraphicsOrderControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.editGraphicsOrder.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case GraphicsOrderNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ message: t('graphics.updated') })
  }
}
