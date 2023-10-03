import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { InactivatePhotographer } from './inactivate-photographer'
import { PhotographerNotFoundError } from './errors/PhotographerNotFoundError'

type InactivatePhotographerControllerRequest = {
  photographerId: string
}

export class InactivatePhotographerController implements Controller {
  constructor(
    private readonly validator: Validator<InactivatePhotographerControllerRequest>,
    private inactivatePhotographer: InactivatePhotographer,
  ) {}

  async handle(
    request: InactivatePhotographerControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.inactivatePhotographer.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case PhotographerNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({}, { message: 'photographer.inactivated' })
  }
}
