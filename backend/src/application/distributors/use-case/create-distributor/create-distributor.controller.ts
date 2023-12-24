import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, created } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { CreateDistributor } from './create-distributor'

type CreateDistributorControllerRequest = {
  name: string
  street: string
  number: number
  city: string
  state: string
  zip: string
  complement?: string
  region: number
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

    return created({ message: 'Distribuidora criada com sucesso' })
  }
}
