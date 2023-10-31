import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, created } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { CreateSubtitle } from './create-subtitle'

type CreateSubtitleControllerRequest = {
  name: string
  description?: string
  type: string
}

export class CreateSubtitleController implements Controller {
  constructor(
    private readonly validator: Validator<CreateSubtitleControllerRequest>,
    private createSubtitle: CreateSubtitle,
  ) {}

  async handle(
    request: CreateSubtitleControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createSubtitle.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        default:
          return clientError(error)
      }
    }

    return created({ message: t('item.created') })
  }
}
