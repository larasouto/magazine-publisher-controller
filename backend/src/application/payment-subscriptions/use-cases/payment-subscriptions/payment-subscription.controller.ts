import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, created } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { CreatePaymentSubscription } from './payment-subscriptions'
import { AddressNotFoundError } from './errors/AddressNotFoundError'
import { CustomerNotFoundError } from './errors/CustomerNotFoundError'
import { SubscriptionNotFoundError } from './errors/SubscriptionNotFoundError'
import { CardNotFoundError } from './errors/CardNotFoundError'

type CreatePaymentSubscriptionControllerRequest = {
  subscriptionId: string
  addressId: string
  cardId: string
  userId: string
}

export class CreatePaymentSubscriptionController implements Controller {
  constructor(
    private readonly validator: Validator<CreatePaymentSubscriptionControllerRequest>,
    private createPaymentSubscription: CreatePaymentSubscription,
  ) {}

  async handle(
    request: CreatePaymentSubscriptionControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createPaymentSubscription.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case SubscriptionNotFoundError:
        case AddressNotFoundError:
        case CustomerNotFoundError:
        case CardNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return created({
      message: t('paymentSubscription.created'),
      dto: result.value.toResponseBody(),
    })
  }
}
