import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, fail, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { DeleteTheme } from './delete-theme'
import { ThemeNotFoundError } from './errors/ThemeNotFoundError'
import { OneOrMoreThemeNotFoundError } from './errors/OneOrMoreThemeNotFoundError'

type DeleteThemeControllerRequest = {
  themeId: string[]
}

export class DeleteThemeController implements Controller {
  constructor(
    private readonly validator: Validator<DeleteThemeControllerRequest>,
    private deleteTheme: DeleteTheme,
  ) {}

  async handle(
    request: DeleteThemeControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.deleteTheme.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ThemeNotFoundError:
        case OneOrMoreThemeNotFoundError:
          return clientError(error)
        default:
          return clientError(error)
      }
    }

    return ok({ message: t('theme.deleted') })
  }
}
