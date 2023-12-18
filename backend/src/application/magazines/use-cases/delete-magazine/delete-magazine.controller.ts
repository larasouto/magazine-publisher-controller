import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { DeleteMagazine } from './delete-magazine'
import { MagazineNotFoundError } from './errors/MagazineNotFoundError'
import { OneOrMoreMagazineNotFoundError } from './errors/OneOrMoreMagazineNotFoundError'

type DeleteMagazineControllerRequest = {
  ids: string[]
}

export class DeleteMagazineController implements Controller {
  constructor(
    private readonly validator: Validator<DeleteMagazineControllerRequest>,
    private deleteMagazine: DeleteMagazine,
  ) {}

  async handle(
    request: DeleteMagazineControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.deleteMagazine.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case MagazineNotFoundError:
        case OneOrMoreMagazineNotFoundError:
          return clientError(error)
        default:
          return clientError(error)
      }
    }

    const message =
      request.ids?.length > 1
        ? 'Uma ou mais revistas foram deletadas com sucesso'
        : 'Revista deletada com sucesso'

    return ok({ message })
  }
}
