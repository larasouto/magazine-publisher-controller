import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, created } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { CreateJobOpportunity } from './create-job-opportunity'


type CreateJobOpportunityControllerRequest = {
  avatar?: string
  office: string
  requirements: string
  hours: number
  wage: number
}
export class CreateJobOpportunityController implements Controller {
  constructor(
    private readonly validator: Validator<CreateJobOpportunityControllerRequest>,
    private createJobOpportunity: CreateJobOpportunity,
  ) {}

  async handle(
    request: CreateJobOpportunityControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createJobOpportunity.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        default:
          return clientError(error)
      }
    }

    return created({ message: t('item.created') })
  }
}
