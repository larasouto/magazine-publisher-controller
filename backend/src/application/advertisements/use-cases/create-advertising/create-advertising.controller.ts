import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, created } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { CreateAdvertising } from './create-advertising'

type CreateAdvertisingControllerRequest = {
  name: string
  categoryAdvertising: string
  numberOfPages: number
  price: number
}

export class CreateAdvertisingController implements Controller {
  constructor(
    private readonly validator: Validator<CreateAdvertisingControllerRequest>,
    private createAdvertising: CreateAdvertising,
  ) {}

  async handle(
    request: CreateAdvertisingControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createAdvertising.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        default:
          return clientError(error)
      }
    }
    return created({ message: t('advertising.created') })
  }
}
