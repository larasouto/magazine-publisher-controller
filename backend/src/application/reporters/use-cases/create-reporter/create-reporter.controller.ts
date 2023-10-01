import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, created } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { CreateReporter } from './create-reporter'

type CreateReporterControllerRequest = {
  name: string
  email: string
  phone?: string
  cpf: string
  specialty: string
  status: string
  entryDate: Date
  departureDate: Date
}

export class CreateReporterController implements Controller {
  constructor(
    private readonly validator: Validator<CreateReporterControllerRequest>,
    private createReporter: CreateReporter,
  ) {}

  async handle(
    request: CreateReporterControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createReporter.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        default:
          return clientError(error)
      }
    }

    return created({ message: t('reporter.created') })
  }
}
