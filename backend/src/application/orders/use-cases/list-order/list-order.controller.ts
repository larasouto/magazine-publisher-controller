import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListOrders } from './list-order'

export class ListOrderController implements Controller {
  constructor(private listOrders: ListOrders) {}

  async handle(): Promise<HttpResponse> {
    const result = await this.listOrders.execute()

    return ok({ dto: result.map((order) => order?.toResponseBody()) })
  }
}
