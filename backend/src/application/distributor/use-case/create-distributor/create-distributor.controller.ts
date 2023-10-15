import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, created } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { CreateDistributor } from './create-dsitributor'

type CreateDistributorControllerRequest = {
  name: string
  address: string
  region: string
}

export class CreateDistributorController implements Controller {
  constructor(
    private readonly validator: Validator<CreateDistributorControllerRequest>,
    private createDistributor: CreateDistributor,
  ) {}

  async handle(
    request: CreateDistributorControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createDistributor.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        default:
          return clientError(error)
      }
    }

    return created({ message: t('distributor.created') })
  }
}
