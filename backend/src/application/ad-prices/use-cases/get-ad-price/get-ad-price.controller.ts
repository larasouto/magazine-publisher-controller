import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { AdPriceNotFoundError } from './errors/AdPriceNotFoundError'
import { GetAdPrice } from './get-ad-price'

type GetAdPriceControllerRequest = {
  magazineId: string
}

export class GetAdPriceController implements Controller {
  constructor(
    private readonly validator: Validator<GetAdPriceControllerRequest>,
    private getAdPrice: GetAdPrice,
  ) {}

  async handle(request: GetAdPriceControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.getAdPrice.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case AdPriceNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ dto: result.value.toResponseBody() })
  }
}
