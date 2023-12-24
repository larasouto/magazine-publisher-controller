import { Controller } from '@/core/infra/controller'
import {
  HttpResponse,
  clientError,
  notFound,
  ok,
} from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { DeleteGraphic } from './delete-graphics'
import { GraphicNotFoundError } from './errors/GraphicNotFoundError'
import { OneOrMoreGraphicNotFoundError } from './errors/OneOrMoreGraphicNotFoundError'

type DeleteGraphicControllerRequest = {
  ids: string[]
}

export class DeleteGraphicController implements Controller {
  constructor(
    private readonly validator: Validator<DeleteGraphicControllerRequest>,
    private deleteGraphic: DeleteGraphic,
  ) {}

  async handle(request: DeleteGraphicControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.deleteGraphic.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case GraphicNotFoundError:
        case OneOrMoreGraphicNotFoundError:
          return notFound(error)
        default:
          return clientError(error)
      }
    }

    return ok({ message: 'Gráfica deletada com sucesso' })
  }
}
