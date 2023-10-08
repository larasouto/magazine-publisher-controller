import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { DeleteEdition } from './delete-edition'
import { EditionNotFoundError } from './errors/EditionNotFoundError'

type DeleteEditionControllerRequest = {
  editionId: string
}

export class DeleteEditionController implements Controller {
  constructor(
    private readonly validator: Validator<DeleteEditionControllerRequest>,
    private deleteEdition: DeleteEdition,
  ) {}

  async handle(
    request: DeleteEditionControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.deleteEdition.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case EditionNotFoundError:
          return clientError(error)
        default:
          return clientError(error)
      }
    }

    return ok({ message: t('edition.deleted') })
  }
}
