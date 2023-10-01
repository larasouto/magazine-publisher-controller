import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { EditPhotographer } from './edit-photographer'
import { PhotographerNotFoundError } from './errors/PhotographerNotFoundError'

type EditPhotographerControllerRequest = {
  photographerId: string
  name: string
  email: string
  phone?: string
  cpf: string
  specialty: string
  status: string
  entryDate: Date
  departureDate?: Date
}

export class EditPhotographerController implements Controller {
  constructor(
    private readonly validator: Validator<EditPhotographerControllerRequest>,
    private editPhotographer: EditPhotographer,
  ) {}

  async handle(
    request: EditPhotographerControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.editPhotographer.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case PhotographerNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ message: t('photographer.updated') })
  }
}
