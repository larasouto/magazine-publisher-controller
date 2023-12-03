import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { GetCandidateJobOpportunity } from './get-candidate-job-opportunitity'
import { CandidateJobOpportunityNotFoundError } from './errors/CandidateJobOpportunityNotFoundError'


type GetCandidateJobOpportunityControllerRequest = {
  candidateJobOpportunityId: string
}
export class GetCandidateJobOpportunityController implements Controller {
  constructor(
    private readonly validator: Validator<GetCandidateJobOpportunityControllerRequest>,
    private getCandidateJobOpportunity: GetCandidateJobOpportunity,
  ) {}

  async handle(
    request: GetCandidateJobOpportunityControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.getCandidateJobOpportunity.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case CandidateJobOpportunityNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ dto: result.value.toResponseBody() })
  }
}
