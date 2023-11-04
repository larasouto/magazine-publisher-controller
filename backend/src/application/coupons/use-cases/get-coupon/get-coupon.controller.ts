import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { UserNotFoundError } from './errors/UserNotFoundError'
import { CouponNotFoundError } from './errors/CouponNotFoundError'
import { GetCoupon } from './get-coupon'

type GetCouponControllerRequest = {
  couponId: string
  userId: string
}

export class GetCouponController implements Controller {
  constructor(
    private readonly validator: Validator<GetCouponControllerRequest>,
    private getCoupon: GetCoupon,
  ) {}

  async handle(request: GetCouponControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.getCoupon.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserNotFoundError:
        case CouponNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ dto: result.value.toResponseBody() })
  }
}
