import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, created } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { CreateSubscription } from './create-subscription'

type CreateSubscriptionControllerRequest = {
  name: string
  description: string
  type: number
  frequency: number
  price: number
  magazineId: string
}

export class CreateSubscriptionController implements Controller {
  constructor(
    private readonly validator: Validator<CreateSubscriptionControllerRequest>,
    private createSubscription: CreateSubscription,
  ) {}

  async handle(
    request: CreateSubscriptionControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createSubscription.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        default:
          return clientError(error)
      }
    }

    return created({ message: t('subscription.created') })
  }
}
