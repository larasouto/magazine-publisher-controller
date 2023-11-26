import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { SubscriptionNotFoundError } from './errors/SubscriptionNotFoundError'
import { GetSubscription } from './get-subscription'
import { UserNotFoundError } from './errors/UserNotFoundError'

type GetSubscriptionControllerRequest = {
  subscriptionId: string
  userId: string
}

export class GetSubscriptionController implements Controller {
  constructor(
    private readonly validator: Validator<GetSubscriptionControllerRequest>,
    private getSubscription: GetSubscription,
  ) {}

  async handle(
    request: GetSubscriptionControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.getSubscription.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserNotFoundError:
        case SubscriptionNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ dto: result.value.toResponseBody() })
  }
}
