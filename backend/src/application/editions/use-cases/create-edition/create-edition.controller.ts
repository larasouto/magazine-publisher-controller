import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, created } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { CreateEdition } from './create-edition'
import { Subtitle } from '@/application/subtitles/domain/subtitle'

type CreateEditionControllerRequest = {
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

export class CreateEditionController implements Controller {
  constructor(
    private readonly validator: Validator<CreateEditionControllerRequest>,
    private createEdition: CreateEdition,
  ) {}

  async handle(request: CreateEditionControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createEdition.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        default:
          return clientError(error)
      }
    }
    return created({ message: t('edition.created') })
  }
}
