import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { EditOffer } from './edit-offer'
import { OfferNotFoundError } from './error/OfferNotFoundError'
import { EditionNotFoundError } from './error/EditionNotFoundError'

type EditOfferControllerRequest = {
  offerId: string
  discountPercentage: number
  dates: {
    from: Date
    to: Date
  }
  editions: string[]
}

export class EditOfferController implements Controller {
  constructor(
    private readonly validator: Validator<EditOfferControllerRequest>,
    private editOffer: EditOffer,
  ) {}

  async handle(request: EditOfferControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.editOffer.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case OfferNotFoundError:
        case EditionNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ message: t('offer.updated') })
  }
}
