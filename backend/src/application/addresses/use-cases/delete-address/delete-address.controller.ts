import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, fail, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { DeleteAddress } from './delete-address'
import { AddressNotFoundError } from './errors/AddressNotFoundError'
import { OneOrMoreAddressNotFoundError } from './errors/OneOrMoreAddressNotFoundError'

type DeleteAddressControllerRequest = {
  ids: string[]
}

export class DeleteAddressController implements Controller {
  constructor(
    private readonly validator: Validator<DeleteAddressControllerRequest>,
    private deleteAddress: DeleteAddress,
  ) {}

  async handle(request: DeleteAddressControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.deleteAddress.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case AddressNotFoundError:
        case OneOrMoreAddressNotFoundError:
          return clientError(error)
        default:
          return clientError(error)
      }
    }

    return ok({ message: t('address.deleted') })
  }
}
