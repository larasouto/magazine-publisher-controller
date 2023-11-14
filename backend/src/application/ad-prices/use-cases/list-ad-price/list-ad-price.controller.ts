import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListAdPrices } from './list-ad-price'

export class ListAdPriceController implements Controller {
  constructor(private listAdPrices: ListAdPrices) {}

  async handle(): Promise<HttpResponse> {
    const result = await this.listAdPrices.execute()

    return ok({ dto: result.map((adPrice) => adPrice?.toResponseBody()) })
  }
}
