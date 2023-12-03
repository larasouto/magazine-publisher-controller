import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, created } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { CreateCandidateJobOpportunity } from './create-candidade-job-opportunity'
''


type CreateCandidateJobOpportunityControllerRequest = {
    candidateId: string;
    jobOpportunityId: string;
}
export class CreateCandidateJobOpportunityController implements Controller {
  constructor(
    private readonly validator: Validator<CreateCandidateJobOpportunityControllerRequest>,
    private createCandidateJobOpportunity: CreateCandidateJobOpportunity,
  ) {}

  async handle(
    request: CreateCandidateJobOpportunityControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createCandidateJobOpportunity.execute(request)

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
