import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { GetGraphicsOrderReturn } from './get-graphicsOrderReturn'
import { GraphicsOrderReturnNotFoundError } from './errors/GraphicsOrderReturnNotFoundError'

type GetGraphicsOrderReturnControllerRequest = {
  graphicsOrderReturnId: string
}

export class GetGraphicsOrderReturnController implements Controller {
  constructor(
    private readonly validator: Validator<GetGraphicsOrderReturnControllerRequest>,
    private getGraphicsOrderReturn: GetGraphicsOrderReturn,
  ) {}

  async handle(
    request: GetGraphicsOrderReturnControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.getGraphicsOrderReturn.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case GraphicsOrderReturnNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ dto: result.value })
  }
}
