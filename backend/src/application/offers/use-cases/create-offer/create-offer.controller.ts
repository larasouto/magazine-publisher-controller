import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, created } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { CreateOffer } from './create-offer'
import { EditionNotFoundError } from './error/EditionNotFoundError'

type CreateOfferControllerRequest = {
  discountPercentage: number
  dates: {
    from: Date
    to: Date
  }
  editions: string[]
}

export class CreateOfferController implements Controller {
  constructor(
    private readonly validator: Validator<CreateOfferControllerRequest>,
    private createOffer: CreateOffer,
  ) {}

  async handle(request: CreateOfferControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }
    console.log(request)
    const result = await this.createOffer.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case EditionNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return created({ message: t('item.created') })
  }
}
