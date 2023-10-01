import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { EditSubtitle } from './edit-subtitle'
import { SubtitleNotFoundError } from './errors/SubtitleNotFoundError'

type EditSubtitleControllerRequest = {
  subtitleId: string
  name: string
  description?: string
  type: string
}

export class EditSubtitleController implements Controller {
  constructor(
    private readonly validator: Validator<EditSubtitleControllerRequest>,
    private editSubtitle: EditSubtitle,
  ) {}

  async handle(request: EditSubtitleControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.editSubtitle.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case SubtitleNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ message: t('subtitle.updated') })
  }
}
