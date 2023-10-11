import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { DeleteGraphics } from './delete-graphics'
import { GraphicsNotFoundError } from './errors/GraphicsNotFoundError'

type DeleteGraphicsControllerRequest = {
  graphicsId: string
}

export class DeleteGraphicsontroller implements Controller {
  constructor(
    private readonly validator: Validator<DeleteGraphicsControllerRequest>,
    private deleteGraphics: DeleteGraphics,
  ) {}

  async handle(
    request: DeleteGraphicsControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.deleteGraphics.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case GraphicsNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ message: t('graphics.deleted') })
  }
}
