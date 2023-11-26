import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, created } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { CreateCandidate } from './create-candidate'
import { JobOpportunityNotFoundError } from '@/application/job-opportunities/use-cases/get-job-opportunitty/errors/JobOpportunityNotFoundError'

type CreateCandidateControllerRequest = {
  pdfPath: string
  name: string
  age: number
  maritalStatus: string
  nationality: string
  email: string
  phone: string
  address: string
  academicEducation: string
  intendedSalary: number
  desiredJobTitle: string
  companyName: string
  positionHeld: string
  companyContact: string
}

export class CreateCandidateController implements Controller {
  constructor(
    private readonly validator: Validator<CreateCandidateControllerRequest>,
    private createCandidate: CreateCandidate,
  ) {}

  async handle(request: CreateCandidateControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createCandidate.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case JobOpportunityNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return created({ message: t('item.created') })
  }
}
