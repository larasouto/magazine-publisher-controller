import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { MagazineNotFoundError } from './errors/MagazineNotFoundError'
import { GetMagazine } from './get-magazine'

type GetMagazineControllerRequest = {
  magazineId: string
}

export class GetMagazineController implements Controller {
  constructor(
    private readonly validator: Validator<GetMagazineControllerRequest>,
    private getMagazine: GetMagazine,
  ) {}

  async handle(request: GetMagazineControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.getMagazine.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case MagazineNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ dto: result.value.toResponseBody() })
  }
}
