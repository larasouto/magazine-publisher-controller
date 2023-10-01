import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { DeleteSubtitle } from './delete-subtitle'
import { SubtitleNotFoundError } from './errors/SubtitleNotFoundError'

type DeleteSubtitleControllerRequest = {
  subtitleId: string
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
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ message: t('subtitle.deleted') })
  }
}
