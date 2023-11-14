import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, created } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { CreatePaymentAdvertising } from './payment-advertising'
import { AdvertisingNotFoundError } from '@/application/advertisings/use-cases/get-advertising/errors/AdvertisingNotFoundError'
import { AddressNotFoundError } from './errors/AddressNotFoundError'
import { CustomerNotFoundError } from './errors/CustomerNotFoundError'
import { CardNotFoundError } from './errors/CardNotFoundError'

type CreatePaymentAdvertisingControllerRequest = {
  advertisingId: string
  addressId: string
  cardId: string
  userId: string
}

export class CreatePaymentAdvertisingController implements Controller {
  constructor(
    private readonly validator: Validator<CreatePaymentAdvertisingControllerRequest>,
    private createPaymentAdvertising: CreatePaymentAdvertising,
  ) {}

  async handle(
    request: CreatePaymentAdvertisingControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createPaymentAdvertising.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case AdvertisingNotFoundError:
        case AddressNotFoundError:
        case CustomerNotFoundError:
        case CardNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return created({
      message: 'Pagamento realizado com sucesso!',
      dto: result.value.toResponseBody(),
    })
  }
}
