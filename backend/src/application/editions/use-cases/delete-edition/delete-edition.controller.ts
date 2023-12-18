import { Controller } from '@/core/infra/controller'
import {
  HttpResponse,
  clientError,
  fail,
  notFound,
  ok,
} from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { DeleteEdition } from './delete-edition'
import { EditionNotFoundError } from './errors/EditionNotFoundError'
import { OneOrMoreEditionNotFoundError } from './errors/OneOrMoreEditonNotFoundError'

type DeleteEditionControllerRequest = {
  ids: string[]
}

export class DeleteEditionController implements Controller {
  constructor(
    private readonly validator: Validator<DeleteEditionControllerRequest>,
    private deleteEdition: DeleteEdition,
  ) {}

  async handle(request: DeleteEditionControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.deleteEdition.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case EditionNotFoundError:
        case OneOrMoreEditionNotFoundError:
          return notFound(error)
        default:
          return clientError(error)
      }
    }

    return ok({ message: 'Edição deletada com sucesso' })
  }
}
