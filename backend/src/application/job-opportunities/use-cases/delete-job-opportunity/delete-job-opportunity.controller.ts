import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { JobOpportunityNotFoundError } from './errors/JobOpportunityNotFoundError'


type DeleteJobOpportunityControllerRequest = {
  jobOpportunityId: string
}

export class DeleteJobOpportunityController implements Controller {
  constructor(
    private readonly validator: Validator<DeleteJobOpportunityControllerRequest>,
    private deleteJobOpportunity: DeleteJobOpportunity,
  ) {}

  async handle(
    request: DeleteJobOpportunityControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.deleteJobOpportunity.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case JobOpportunityNotFoundError:
          return clientError(error)
        default:
          return clientError(error)
      }
    }

    return ok({ message: t('jobOpportunity.deleted') })
  }
}
