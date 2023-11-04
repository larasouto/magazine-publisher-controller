import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, created } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { User } from '@/application/users/domain/user'
import { UserNotFoundError } from './errors/UserNotFoundError'
import { CreateCoupon } from './create-coupon'

type CreateCouponControllerRequest = {
  couponCode: string
  discountAmount: number
  expirationDate: string
  maximumAmountOfUse: number
  type: number
  userId: string
}

export class CreateCouponController implements Controller {
  constructor(
    private readonly validator: Validator<CreateCouponControllerRequest>,
    private createCoupon: CreateCoupon,
  ) {}

  async handle(request: CreateCouponControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createCoupon.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return created({ message: t('item.created') })
  }
}
