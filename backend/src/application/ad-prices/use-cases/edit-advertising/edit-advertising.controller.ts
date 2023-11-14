import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { EditAdPrice } from './edit-advertising'
import { AdPriceNotFoundError } from './errors/AdPriceNotFoundError'

type EditAdPriceControllerRequest = {
  adPriceId: string
  bannerPrice: number
  wholePagePrice: number
  doublePagePrice: number
  beginningPrice: number
  middlePrice: number
  endPrice: number
  magazineId: string
}

export class EditAdPriceController implements Controller {
  constructor(
    private readonly validator: Validator<EditAdPriceControllerRequest>,
    private editAdPrice: EditAdPrice,
  ) {}

  async handle(request: EditAdPriceControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.editAdPrice.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case AdPriceNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ message: t('advertising.updated') })
  }
}
