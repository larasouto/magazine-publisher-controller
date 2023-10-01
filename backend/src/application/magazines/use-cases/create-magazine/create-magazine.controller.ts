import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, created } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { CreateMagazine } from './create-magazine'

type CreateMagazineControllerRequest = {
  name: string
  description?: string
  yearFounded: number
  publicationPeriod: string
  themeId: string
}

export class CreateMagazineController implements Controller {
  constructor(
    private readonly validator: Validator<CreateMagazineControllerRequest>,
    private createMagazine: CreateMagazine,
  ) {}

  async handle(
    request: CreateMagazineControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createMagazine.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        default:
          return clientError(error)
      }
    }
    return created({ message: t('magazine.created') })
  }
}
