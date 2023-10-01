import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { EditTheme } from './edit-theme'
import { ThemeNotFoundError } from './errors/ThemeNotFoundError'

type EditThemeControllerRequest = {
  themeId: string
  name: string
  description?: string
}

export class EditThemeController implements Controller {
  constructor(
    private readonly validator: Validator<EditThemeControllerRequest>,
    private editTheme: EditTheme,
  ) {}

  async handle(request: EditThemeControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.editTheme.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ThemeNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ message: t('theme.updated') })
  }
}
