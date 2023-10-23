import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { EditSubscription } from './edit-subscription'
import { SubscriptionNotFoundError } from './errors/SubscriptionNotFoundError'

type EditSubscriptionControllerRequest = {
  subscriptionId: string
  name: string
  description: string
  type: number
  frequency: number
  price: number
  magazineId: string
}

export class EditSubscriptionController implements Controller {
  constructor(
    private readonly validator: Validator<EditSubscriptionControllerRequest>,
    private editSubscription: EditSubscription,
  ) {}

  async handle(
    request: EditSubscriptionControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.editSubscription.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case SubscriptionNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ message: t('subscription.updated') })
  }
}
