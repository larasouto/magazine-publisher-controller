import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { GetOffer } from './get-offer'
import { OfferNotFoundError } from './error/OfferNotFoundError'

type GetOfferControllerRequest = {
  offerId: string
}

export class GetOfferController implements Controller {
  constructor(
    private readonly validator: Validator<GetOfferControllerRequest>,
    private getOffer: GetOffer,
  ) {}

  async handle(request: GetOfferControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.getOffer.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case OfferNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ dto: result.value.toResponseBody() })
  }
}
