import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { GetGraphicsOnDistributor } from './get-graphicsOnDistributor'
import { GraphicsOnDistributorNotFoundError } from './errors/GraphicsOnDistributorNotFoundError'

type GetGraphicsOnDistributorControllerRequest = {
  graphicsOnDistributorId: string
}

export class GetGraphicsOnDistributorController implements Controller {
  constructor(
    private readonly validator: Validator<GetGraphicsOnDistributorControllerRequest>,
    private getGraphicsOnDistributor: GetGraphicsOnDistributor,
  ) {}

  async handle(request: GetGraphicsOnDistributorControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.getGraphicsOnDistributor.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case GraphicsOnDistributorNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ dto: result.value })
  }
}
