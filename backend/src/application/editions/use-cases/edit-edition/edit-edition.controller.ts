import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { EditEdition } from './edit-edition'
import { EditionNotFoundError } from './errors/EditionNotFoundError'

type EditEditionControllerRequest = {
  editionId: string
  number: number
  title: string
  description?: string
  coverPath: string
  price: number
  year: number
  publicationDate: Date
  numberOfCopies: number
  numberOfPages: number
  magazineId: string
  subtitles: string[]
}

export class EditEditionController implements Controller {
  constructor(
    private readonly validator: Validator<EditEditionControllerRequest>,
    private editEdition: EditEdition,
  ) {}

  async handle(request: EditEditionControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.editEdition.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case EditionNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ message: t('edition.updated') })
  }
}
