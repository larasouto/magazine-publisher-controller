import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { GetGraphics } from './get-graphics'
import { GraphicsNotFoundError } from '../delete-graphics/errors/GraphicNotFoundError'

type GetGraphicsControllerRequest = {
  graphicsId: string
}

export class GetGraphicsController implements Controller {
  constructor(
    private readonly validator: Validator<GetGraphicsControllerRequest>,
    private getGraphics: GetGraphics,
  ) {}

  async handle(request: GetGraphicsControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.getGraphics.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case GraphicsNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ dto: result.value })
  }
}
