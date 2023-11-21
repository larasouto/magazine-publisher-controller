import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { JobOpportunityNotFoundError } from './errors/JobOpportunityNotFoundError'
import { GetJobOpportunity } from './get-job-opportunity'


export class GetJobOpportunityController implements Controller {
  constructor(
    private readonly validator: Validator<GetJobOpportunityControllerRequest>,
    private getJobOpportunity: GetJobOpportunity,
  ) {}

  async handle(
    request: GetJobOpportunityControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.getJobOpportunity.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case JobOpportunityNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ dto: result.value.toResponseBody() })
  }
}
