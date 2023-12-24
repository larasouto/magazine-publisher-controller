import { Controller } from '@/core/infra/controller'
import {
  HttpResponse,
  clientError,
  notFound,
  ok,
} from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { DeleteDistributor } from './delete-distributor'
import { DistributorNotFoundError } from './errors/DistributorNotFoundError'
import { OneOrMoreDistributorNotFoundError } from './errors/OneOrMoreDistributorNotFoundError'

type DeleteDistributorControllerRequest = {
  ids: string[]
}

export class DeleteDistributorController implements Controller {
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
        case OneOrMoreDistributorNotFoundError:
          return notFound(error)
        default:
          return clientError(error)
      }
    }

    return ok({ message: 'Distribuidora deletada com sucesso' })
  }
}
