import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { AddressNotFoundError } from './errors/AddressNotFoundError'
import { GetAddress } from './get-address'
import { UserNotFoundError } from './errors/UserNotFoundError'

type GetAddressControllerRequest = {
  addressId: string
  userId: string
}

export class GetAddressController implements Controller {
  constructor(
    private readonly validator: Validator<GetAddressControllerRequest>,
    private getAddress: GetAddress,
  ) {}

  async handle(request: GetAddressControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.getAddress.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserNotFoundError:
        case AddressNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ dto: result.value.toResponseBody() })
  }
}
