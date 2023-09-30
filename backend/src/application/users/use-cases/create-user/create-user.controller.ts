import { Controller } from '@/core/infra/controller'
import {
  HttpResponse,
  clientError,
  conflict,
  created,
} from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { CreateUser } from './create-user'
import { UserAlreadyExistsError } from './errors/UserAlreadyExistsError'

type CreateUserControllerRequest = {
  email: string
  name: string
  password: string
  confirmPassword: string
  phone?: string
}

export class CreateUserController implements Controller {
  constructor(
    private readonly validator: Validator<CreateUserControllerRequest>,
    private createUser: CreateUser,
  ) {}

  async handle(request: CreateUserControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createUser.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserAlreadyExistsError:
          return conflict(error)
        default:
          return clientError(error)
      }
    }
    return created({ message: t('account.created') })
  }
}
