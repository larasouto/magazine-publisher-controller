import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { CandidateNotFoundError } from './errors/CandidateNotFoundError'
import { GetCandidate } from './get-candidate'

type GetCandidateControllerRequest = {
  candidateId: string
}

export class GetCandidateController implements Controller {
  constructor(
    private readonly validator: Validator<GetCandidateControllerRequest>,
    private getCandidate: GetCandidate,
  ) {}

  async handle(request: GetCandidateControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.getCandidate.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case CandidateNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ dto: result.value.toResponseBody() })
  }
}
