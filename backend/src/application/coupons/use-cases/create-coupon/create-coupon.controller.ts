import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, created } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { CreateCoupon } from './create-coupon'

type CreateCouponControllerRequest = {
  couponCode: string
  discountAmount: number
  expirationDate: Date
  type: number
  userId: string
  sendNotification: boolean
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
        default:
          return clientError(error)
      }
    }

    return created({ message: 'Cupom criado com sucesso' })
  }
}
