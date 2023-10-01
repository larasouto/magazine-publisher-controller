import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, created } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { CreateTheme } from './create-theme'

type CreateThemeControllerRequest = {
  name: string
  description?: string
}

export class CreateThemeController implements Controller {
  constructor(
    private readonly validator: Validator<CreateThemeControllerRequest>,
    private createTheme: CreateTheme,
  ) {}

  async handle(request: CreateThemeControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createTheme.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        default:
          return clientError(error)
      }
    }

    return created({ message: t('theme.created') })
  }
}
