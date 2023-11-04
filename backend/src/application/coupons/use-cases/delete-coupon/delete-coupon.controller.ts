import { Controller } from '@/core/infra/controller'
import {
  HttpResponse,
  clientError,
  fail,
  notFound,
  ok,
} from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { CouponNotFoundError } from './errors/CouponNotFoundError'
import { OneOrMoreCouponNotFoundError } from './errors/OneOrMoreCouponNotFoundError'
import { DeleteCoupon } from './delete-coupon'


type DeleteCouponControllerRequest = {
  ids: string[]
}

export class DeleteCouponController implements Controller {
  constructor(
    private readonly validator: Validator<DeleteCouponControllerRequest>,
    private deleteCoupon: DeleteCoupon,
  ) {}

  async handle(request: DeleteCouponControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.deleteCoupon.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case CouponNotFoundError:
        case OneOrMoreCouponNotFoundError:
          return notFound(error)
        default:
          return clientError(error)
      }
    }

    return ok({ message: t('coupon.deleted') })
  }
}
