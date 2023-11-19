import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { GraphicsOrderNotFoundError } from './errors/GraphicsOrderNotFoundError'
import { GetGraphicsOrder } from './get-graphicsOrder'

type GetGraphicsOrderControllerRequest = {
  graphicsOrderId: string
}

export class GetGraphicsOrderController implements Controller {
  constructor(
    private readonly validator: Validator<GetGraphicsOrderControllerRequest>,
    private getGraphicsOrder: GetGraphicsOrder,
  ) {}

  async handle(
    request: GetGraphicsOrderControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.getGraphicsOrder.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case GraphicsOrderNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ dto: result.value })
  }
}
