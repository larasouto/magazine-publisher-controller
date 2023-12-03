import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, created } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { CreateGraphicsOnDistributor } from './create-graphicsOnDistributor'

type CreateGraphicsOnDistributorControllerRequest = {
  graphicsId: string;
  distributorId: string;
}

export class CreateGraphicsOnDistributorController implements Controller {
  constructor(
    private readonly validator: Validator<CreateGraphicsOnDistributorControllerRequest>,
    private createGraphicsOnDistributor: CreateGraphicsOnDistributor,
  ) {}

  async handle(
    request: CreateGraphicsOnDistributorControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createGraphicsOnDistributor.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        default:
          return clientError(error)
      }
    }

    return created({ message: t('graphicsOnDistributor.created') })
  }
}
