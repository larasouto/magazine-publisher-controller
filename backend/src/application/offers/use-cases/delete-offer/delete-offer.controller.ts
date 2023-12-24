import { Controller } from '@/core/infra/controller'
import {
  HttpResponse,
  clientError,
  notFound,
  ok,
} from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { DeleteOffer } from './delete-offer'
import { OfferNotFoundError } from '../edit-offer/error/OfferNotFoundError'
import { OneOrMoreOfferNotFoundError } from './errors/OneOrMoreOfferNotFoundError'

type DeleteOfferControllerRequest = {
  ids: string[]
}

export class DeleteOfferController implements Controller {
  constructor(
    private readonly validator: Validator<DeleteOfferControllerRequest>,
    private deleteOffer: DeleteOffer,
  ) {}

  async handle(request: DeleteOfferControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.deleteOffer.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case OfferNotFoundError:
        case OneOrMoreOfferNotFoundError:
          return notFound(error)
        default:
          return clientError(error)
      }
    }

    return ok({ message: t('offer.deleted') })
  }
}
