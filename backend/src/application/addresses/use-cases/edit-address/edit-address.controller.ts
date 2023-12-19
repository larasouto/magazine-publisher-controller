import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { EditAddress } from './edit-address'
import { AddressNotFoundError } from './errors/AddressNotFoundError'
import { UserNotFoundError } from './errors/UserNotFoundError'

type EditAddressControllerRequest = {
  addressId: string
  street: string
  number: number
  complement: string
  city: string
  state: string
  zip: string
  userId: string
}

export class EditAddressController implements Controller {
  constructor(
    private readonly validator: Validator<EditAddressControllerRequest>,
    private editAddress: EditAddress,
  ) {}

  async handle(request: EditAddressControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.editAddress.execute(request)

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

    return ok({ message: 'Endereço atualizado com sucesso' })
  }
}
