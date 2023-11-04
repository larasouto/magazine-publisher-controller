import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { CouponNotFoundError } from './errors/CouponNotFoundError'
import { EditCoupon } from './edit-coupon'

type EditCouponControllerRequest = {
  couponId: string
  couponCode: string
  discountAmount: number
  expirationDate: string
  availableQuantity: number
  type: number
}

export class EditCouponController implements Controller {
  constructor(
    private readonly validator: Validator<EditCouponControllerRequest>,
    private editCoupon: EditCoupon,
  ) {}

  async handle(request: EditCouponControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.editCoupon.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case CouponNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ message: t('coupon.updated') })
  }
}
