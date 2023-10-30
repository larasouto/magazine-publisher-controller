import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, fail, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { DeleteSubscription } from './delete-subscription'
import { SubscriptionNotFoundError } from './errors/SubscriptionNotFoundError'
import { OneOrMoreSubscriptionNotFoundError } from './errors/OneOrMoreSubscriptionNotFoundError'

type DeleteSubscriptionControllerRequest = {
  ids: string[]
}

export class DeleteSubscriptionController implements Controller {
  constructor(
    private readonly validator: Validator<DeleteSubscriptionControllerRequest>,
    private deleteSubscription: DeleteSubscription,
  ) {}

  async handle(
    request: DeleteSubscriptionControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.deleteSubscription.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case SubscriptionNotFoundError:
        case OneOrMoreSubscriptionNotFoundError:
          return clientError(error)
        default:
          return clientError(error)
      }
    }

    const message =
      request.ids?.length > 1
        ? t('subscription.deleted_many')
        : t('subscription.deleted')

    return ok({ message })
  }
}
