import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { ThemeNotFoundError } from './errors/ThemeNotFoundError'
import { GetTheme } from './get-theme'

type GetThemeControllerRequest = {
  themeId: string
}

export class GetThemeController implements Controller {
  constructor(
    private readonly validator: Validator<GetThemeControllerRequest>,
    private getTheme: GetTheme,
  ) {}

  async handle(request: GetThemeControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.getTheme.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ThemeNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ dto: result.value.toResponseBody() })
  }
}
