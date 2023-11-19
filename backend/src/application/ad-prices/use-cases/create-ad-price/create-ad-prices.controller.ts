import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, created } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { CreateAdPrice } from './create-ad-prices'
import { MagazineNotFoundError } from './errors/MagazineNotFoundError'

type CreateAdPriceControllerRequest = {
  bannerPrice: number
  wholePagePrice: number
  doublePagePrice: number
  beginningPrice: number
  middlePrice: number
  endPrice: number
  magazineId: string
}

export class CreateAdPriceController implements Controller {
  constructor(
    private readonly validator: Validator<CreateAdPriceControllerRequest>,
    private createAdPrice: CreateAdPrice,
  ) {}

  async handle(request: CreateAdPriceControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createAdPrice.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case MagazineNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return created({ message: t('adPrice.created') })
  }
}
