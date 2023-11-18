import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { AdvertisingNotFoundError } from './errors/AdvertisingNotFoundError'
import { UpdateStatusAdvertising } from './update-status'

type UpdateStatusAdvertisingControllerRequest = {
  advertisingId: string
  status: number
}

export class UpdateStatusAdvertisingController implements Controller {
  constructor(
    private readonly validator: Validator<UpdateStatusAdvertisingControllerRequest>,
    private updateStatus: UpdateStatusAdvertising,
  ) {}

  async handle(
    request: UpdateStatusAdvertisingControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.updateStatus.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case AdvertisingNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({}, { message: 'advertising.updateStatus' })
  }
}
