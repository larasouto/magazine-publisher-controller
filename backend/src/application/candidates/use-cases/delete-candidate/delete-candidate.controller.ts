import { Controller } from '@/core/infra/controller'
import {
  HttpResponse,
  clientError,
  fail,
  notFound,
  ok,
} from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { DeleteCandidate } from './delete-candidate'
import { CandidateNotFoundError } from './errors/CandidateNotFoundError'
import { OneOrMoreCandidateNotFoundError } from './errors/OneOrMoreCandidateNotFoundError'

type DeleteCandidateControllerRequest = {
  ids: string[]
}

export class DeleteCandidateController implements Controller {
  constructor(
    private readonly validator: Validator<DeleteCandidateControllerRequest>,
    private deleteCandidate: DeleteCandidate,
  ) {}

  async handle(request: DeleteCandidateControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.deleteCandidate.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case CandidateNotFoundError:
        case OneOrMoreCandidateNotFoundError:
          return notFound(error)
        default:
          return clientError(error)
      }
    }

    return ok({ message: t('candidate.deleted') })
  }
}
