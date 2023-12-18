import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { SubscriptionNotFoundError } from './errors/SubscriptionNotFoundError'
import { UserNotFoundError } from './errors/UserNotFoundError'
import { RenewSubscription } from './renew-subscription'

type RenewSubscriptionControllerRequest = {
  subscriptionId: string
  userId: string
}

export class RenewSubscriptionController implements Controller {
  constructor(
    private readonly validator: Validator<RenewSubscriptionControllerRequest>,
    private activate: RenewSubscription,
  ) {}

  async handle(
    request: RenewSubscriptionControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.activate.execute(request)

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

    return ok({}, { message: 'Assinatura renovada' })
  }
}
