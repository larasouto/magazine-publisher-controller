import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListOrder } from './list-order'

export class ListOrderController implements Controller {
  constructor(private listOrders: ListOrder) {}

  async handle(): Promise<HttpResponse> {
    const result = await this.listOrders.execute()

    return ok({ dto: result })
  }
}
