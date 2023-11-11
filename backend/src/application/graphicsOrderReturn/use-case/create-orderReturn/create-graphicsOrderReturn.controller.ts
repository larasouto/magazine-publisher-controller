import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, created } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { CreateGraphicsOrderReturn } from './create-graphicsOrderReturn'

type CreateGraphicsOrderReturnControllerRequest = {
  returnDate: Date
  returnNumber: number
  graphicsOrderId: string
}

export class CreateGraphicsOrderReturnController implements Controller {
  constructor(
    private readonly validator: Validator<CreateGraphicsOrderReturnControllerRequest>,
    private createGraphicsOrderReturn: CreateGraphicsOrderReturn,
  ) {}

  async handle(
    request: CreateGraphicsOrderReturnControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result =
      await this.createGraphicsOrderReturn.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        default:
          return clientError(error)
      }
    }

    return created({ message: t('graphicsOrderReturn.created') })
  }
}
