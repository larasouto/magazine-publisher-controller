import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { AdvertisingNotFoundError } from './errors/AdvertisingNotFoundError'
import { GetAdvertising } from './get-advertising'

type GetAdvertisingControllerRequest = {
  advertisingId: string
}

export class GetAdvertisingController implements Controller {
  constructor(
    private readonly validator: Validator<GetAdvertisingControllerRequest>,
    private getAdvertising: GetAdvertising,
  ) {}

  async handle(
    request: GetAdvertisingControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.getAdvertising.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case AdvertisingNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ dto: result.value.toResponseBody() })
  }
}
