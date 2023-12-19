import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { EditReporter } from './edit-reporter'
import { ReporterNotFoundError } from './errors/ReporterNotFoundError'

type EditReporterControllerRequest = {
  reporterId: string
  name: string
  email: string
  phone?: string
  cpf: string
  specialty: string
  status: string
  entryDate: Date
  departureDate?: Date
}

export class EditReporterController implements Controller {
  constructor(
    private readonly validator: Validator<EditReporterControllerRequest>,
    private editReporter: EditReporter,
  ) {}

  async handle(request: EditReporterControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.editReporter.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ReporterNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ message: 'Repórter atualizado com sucesso' })
  }
}
