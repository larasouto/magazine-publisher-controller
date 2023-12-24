import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { GetPhotographer } from './get-photographer'
import { PhotographerNotFoundError } from './errors/PhotographerNotFoundError'

type GetPhotographerControllerRequest = {
  photographerId: string
}

export class GetPhotographerController implements Controller {
  constructor(
    private readonly validator: Validator<GetPhotographerControllerRequest>,
    private getPhotographer: GetPhotographer,
  ) {}

  async handle(
    request: GetPhotographerControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.getPhotographer.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case PhotographerNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ dto: result.value.toResponseBody() })
  }
}
