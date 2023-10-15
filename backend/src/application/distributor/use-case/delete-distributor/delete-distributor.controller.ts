import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'

import { DistributorNotFoundError } from './errors/DistributorNotFoundError'
import { DeleteDistributor } from './delete-distributor'

type DeleteDistributorControllerRequest = {
  distributorId: string
}

export class DeleteDistributorontroller implements Controller {
  constructor(
    private readonly validator: Validator<DeleteDistributorControllerRequest>,
    private deleteDistributor: DeleteDistributor,
  ) {}

  async handle(
    request: DeleteDistributorControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.deleteDistributor.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case DistributorNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ message: t('distributor.deleted') })
  }
}
