import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, fail, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { DeleteSubtitle } from './delete-subtitle'
import { OneOrMoreSubtitleNotFoundError } from './errors/OneOrMoreSubtitleNotFoundError'
import { SubtitleNotFoundError } from './errors/SubtitleNotFoundError'

type DeleteSubtitleControllerRequest = {
  ids: string[]
}

export class DeleteSubtitleController implements Controller {
  constructor(
    private readonly validator: Validator<DeleteSubtitleControllerRequest>,
    private deleteSubtitle: DeleteSubtitle,
  ) {}

  async handle(
    request: DeleteSubtitleControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.deleteSubtitle.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case SubtitleNotFoundError:
        case OneOrMoreSubtitleNotFoundError:
          return clientError(error)
        default:
          return clientError(error)
      }
    }

    const message =
      request.ids?.length > 1
        ? 'Um ou mais subtítulos de capa deletados'
        : 'Subtítulo de capa deletado'

    return ok({ message })
  }
}
