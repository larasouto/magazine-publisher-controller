import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { GetDistributor } from './get-distributor'
import { DistributorNotFoundError } from './errors/DistributorNotFoundError'

type GetDistributorControllerRequest = {
  distributorId: string
}

export class GetDistributorController implements Controller {
  constructor(
    private readonly validator: Validator<GetDistributorControllerRequest>,
    private getDistributor: GetDistributor,
  ) {}

  async handle(
    request: GetDistributorControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.getDistributor.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case DistributorNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ dto: result.value })
  }
}
