import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { CancelSubscription } from './cancel-subscription'
import { SubscriptionNotFoundError } from './errors/SubscriptionNotFoundError'
import { UserNotFoundError } from './errors/UserNotFoundError'

type CancelSubscriptionControllerRequest = {
  subscriptionId: string
  userId: string
}

export class CancelSubscriptionController implements Controller {
  constructor(
    private readonly validator: Validator<CancelSubscriptionControllerRequest>,
    private inactivate: CancelSubscription,
  ) {}

  async handle(
    request: CancelSubscriptionControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.inactivate.execute(request)

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

    return ok({ message: 'Assinatura cancelada com sucesso' })
  }
}
