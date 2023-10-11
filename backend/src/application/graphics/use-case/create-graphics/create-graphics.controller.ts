import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, created } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { CreateGraphics } from './create-graphics'

type CreateGraphicsControllerRequest = {
  name: string
  address: string
}

export class CreateGraphicsController implements Controller {
  constructor(
    private readonly validator: Validator<CreateGraphicsControllerRequest>,
    private createGraphics: CreateGraphics,
  ) {}

  async handle(
    request: CreateGraphicsControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createGraphics.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        default:
          return clientError(error)
      }
    }

    return created({ message: t('graphics.created') })
  }
}
