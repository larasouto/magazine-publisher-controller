import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { GraphicsNotFoundError } from './errors/GraphicsNotFoundError'
import { EditGraphics } from './edit-graphics'

type EditGraphicsControllerRequest = {
  graphicId: string
  name: string
  street: string
  number: number
  city: string
  state: string
  zip: string
  complement?: string
}

export class EditGraphicsController implements Controller {
  constructor(
    private readonly validator: Validator<EditGraphicsControllerRequest>,
    private editGraphics: EditGraphics,
  ) {}

  async handle(request: EditGraphicsControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.editGraphics.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case GraphicsNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ message: 'Gráfica atualizada com sucesso' })
  }
}
