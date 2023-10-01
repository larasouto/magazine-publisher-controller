import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { ReporterNotFoundError } from './errors/ReporterNotFoundError'
import { InactivateReporter } from './inactivate-reporter'

type InactivateReporterControllerRequest = {
  reporterId: string
}

export class InactivateReporterController implements Controller {
  constructor(
    private readonly validator: Validator<InactivateReporterControllerRequest>,
    private inactiveReporter: InactivateReporter,
  ) {}

  async handle(
    request: InactivateReporterControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.inactiveReporter.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ReporterNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({}, { message: 'reporter.inactivated' })
  }
}
