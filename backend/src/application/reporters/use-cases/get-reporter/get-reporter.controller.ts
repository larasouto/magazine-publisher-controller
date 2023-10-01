import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'

import { ReporterNotFoundError } from './errors/ReporterNotFoundError'
import { GetReporter } from './get-reporter'

type GetReporterControllerRequest = {
  reporterId: string
}

export class GetReporterController implements Controller {
  constructor(
    private readonly validator: Validator<GetReporterControllerRequest>,
    private getReporter: GetReporter,
  ) {}

  async handle(request: GetReporterControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.getReporter.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ReporterNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ dto: result.value })
  }
}
