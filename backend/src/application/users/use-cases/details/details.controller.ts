import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { UserNotFoundError } from './errors/UserNotFoundError'
import { GetUserDetails } from './details'

type GetUserDetailsControllerRequest = {
  userId: string
}

export class GetUserDetailsController implements Controller {
  constructor(
    private readonly validator: Validator<GetUserDetailsControllerRequest>,
    private getUser: GetUserDetails,
  ) {}

  async handle(
    request: GetUserDetailsControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.getUser.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ dto: result.value })
  }
}
