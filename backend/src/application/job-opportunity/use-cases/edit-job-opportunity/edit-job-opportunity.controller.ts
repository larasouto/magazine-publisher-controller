import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { EditJobOpportunity } from './edit-job-opportunity'
import { JobOpportunityNotFoundError } from './errors/JobOpportunityNotFoundError'

type EditJobOpportunityControllerRequest = {
  jobOpportunityId: string
  office: string
  requirements: string
  hours: string
  wage: string
  name: string
  age: string
  marital_status: string
  nationality: string
  email: string
  phone: string
  address: string
  academic_education: string
  intended_salary: string
  desired_job_title: string
  company_name: string
  position_held: string
  company_contact: string
}
export class EditJobOpportunityController implements Controller {
  constructor(
    private readonly validator: Validator<EditJobOpportunityControllerRequest>,
    private editJobOpportunity: EditJobOpportunity,
  ) {}

  async handle(
    request: EditJobOpportunityControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.editJobOpportunity.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case JobOpportunityNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ message: t('jobOpportunity.updated') })
  }
}
