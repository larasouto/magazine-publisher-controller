import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { EditionNotFoundError } from './errors/EditionNotFoundError'
import { GetEdition } from './get-edition'

type GetEditionControllerRequest = {
  editionId: string
}

export class GetEditionController implements Controller {
  constructor(
    private readonly validator: Validator<GetEditionControllerRequest>,
    private getEdition: GetEdition,
  ) {}

  async handle(request: GetEditionControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.getEdition.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case EditionNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ dto: result.value })
  }
}
