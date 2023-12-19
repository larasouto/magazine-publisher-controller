import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { DistributorNotFoundError } from '../delete-distributor/errors/DistributorNotFoundError'
import { EditDistributor } from './edit-distributor'

type EditDistributorControllerRequest = {
  distributorId: string
  name: string
  address: string
  region: string
}

export class EditDistributorController implements Controller {
  constructor(
    private readonly validator: Validator<EditDistributorControllerRequest>,
    private editDistributor: EditDistributor,
  ) {}

  async handle(
    request: EditDistributorControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.editDistributor.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case DistributorNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ message: 'Distribuidora atualizada com sucesso' })
  }
}
