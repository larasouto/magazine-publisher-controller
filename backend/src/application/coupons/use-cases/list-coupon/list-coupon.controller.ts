import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListCoupons } from './list-coupon'

export class ListCouponController implements Controller {
  constructor(private listCoupons: ListCoupons) {}

  async handle(): Promise<HttpResponse> {
    const result = await this.listCoupons.execute()

    return ok({ dto: result.map((coupon) => coupon?.toResponseBody()) })
  }
}
