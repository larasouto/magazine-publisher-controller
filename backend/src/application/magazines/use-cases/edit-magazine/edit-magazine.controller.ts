import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { EditMagazine } from './edit-magazine'
import { MagazineNotFoundError } from './errors/MagazineNotFoundError'
import { PublicationPeriod } from '../../domain/magazine.schema'

type EditMagazineControllerRequest = {
  magazineId: string
  name: string
  description?: string
  yearFounded: number
  publicationPeriod: PublicationPeriod
  themeId: string
}

export class EditMagazineController implements Controller {
  constructor(
    private readonly validator: Validator<EditMagazineControllerRequest>,
    private editMagazine: EditMagazine,
  ) {}

  async handle(request: EditMagazineControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.editMagazine.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case MagazineNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ message: t('magazine.updated') })
  }
}
