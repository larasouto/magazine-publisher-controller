import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { ForgotPassword } from './forgot-password'
import { UserDoesNotExistError } from './errors/UserDoesNotExistError'

type ForgotPasswordControllerRequest = {
  email: string
}

export class ForgotPasswordController implements Controller {
  constructor(
    private readonly validator: Validator<ForgotPasswordControllerRequest>,
    private forgotPassword: ForgotPassword,
  ) {}
  async handle(
    request: ForgotPasswordControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }
    const result = await this.forgotPassword.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserDoesNotExistError:
          return clientError(error)
        default:
          return clientError(error)
      }
    }

    return ok({ message: t('user.forgot_password') })
  }
}
