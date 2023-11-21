import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListGraphicsOrder } from './list-graphicsOrder'

export class ListGraphicsOrderController implements Controller {
  constructor(private listGraphicsOrders: ListGraphicsOrder) {}

  async handle(): Promise<HttpResponse> {
    const result = await this.listGraphicsOrders.execute()

    return ok({
      dto: result.map((graphicsOrder) => graphicsOrder.toResponseBody()),
    })
  }
}
