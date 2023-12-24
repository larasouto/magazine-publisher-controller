import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListOrders } from './list-order'

type ListOrderControllerRequest = {
  userId: string
}

export class ListOrderController implements Controller {
  constructor(private listOrders: ListOrders) {}

  async handle(request: ListOrderControllerRequest): Promise<HttpResponse> {
    const result = await this.listOrders.execute(request)

    return ok({ dto: result.map((order) => order?.toResponseBody()) })
  }
}
