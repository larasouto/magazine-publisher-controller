import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, created } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { CreateAddress } from './create-address'

type CreateAddressControllerRequest = {
  street: string
  number: number
  complement: string
  zip: string
  city: string
  state: string
  userId: string
}

export class CreateAddressController implements Controller {
  constructor(
    private readonly validator: Validator<CreateAddressControllerRequest>,
    private createAddress: CreateAddress,
  ) {}

  async handle(request: CreateAddressControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createAddress.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        default:
          return clientError(error)
      }
    }

    return created({ message: t('address.created') })
  }
}
