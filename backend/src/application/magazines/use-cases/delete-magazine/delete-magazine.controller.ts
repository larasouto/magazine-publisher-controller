import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { DeleteMagazine } from './delete-magazine'
import { MagazineNotFoundError } from './errors/MagazineNotFoundError'

type DeleteMagazineControllerRequest = {
  magazineId: string
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
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ message: t('magazine.deleted') })
  }
}
