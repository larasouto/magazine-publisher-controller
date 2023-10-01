import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, created } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { CreatePhotographer } from './create-photographer'

type CreatePhotographerControllerRequest = {
  name: string
  email: string
  phone?: string
  cpf: string
  specialty: string
  status: string
  entryDate: Date
  departureDate: Date
}

export class CreatePhotographerController implements Controller {
  constructor(
    private readonly validator: Validator<CreatePhotographerControllerRequest>,
    private createPhotographer: CreatePhotographer,
  ) {}

  async handle(
    request: CreatePhotographerControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createPhotographer.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        default:
          return clientError(error)
      }
    }

    return created({ message: t('photographer.created') })
  }
}
