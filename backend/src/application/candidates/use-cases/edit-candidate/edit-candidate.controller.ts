import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { EditCandidate } from './edit-candidate'
import { CandidateNotFoundError } from './errors/CandidateNotFoundError'
import { JobOpportunityNotFoundError } from './errors/JobOpportunityNotFoundError'

type EditCandidateControllerRequest = {
  candidateId: string
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
  jobOpportunities: string[]
  companyName: string
  positionHeld: string
  companyContact: string
}

export class EditCandidateController implements Controller {
  constructor(
    private readonly validator: Validator<EditCandidateControllerRequest>,
    private editCandidate: EditCandidate,
  ) {}

  async handle(request: EditCandidateControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.editCandidate.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case CandidateNotFoundError:
        case JobOpportunityNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ message: t('candidate.updated') })
  }
}
