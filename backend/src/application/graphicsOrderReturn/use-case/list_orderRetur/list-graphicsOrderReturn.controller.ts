import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListGraphicsOrderReturn } from './list-graphicsOrderReturn'

export class ListGraphicsOrderReturnnController implements Controller {
  constructor(private listGraphicsOrderReturnn: ListGraphicsOrderReturn) {}

  async handle(): Promise<HttpResponse> {
    const result = await this.listGraphicsOrderReturnn.execute()
    return ok({ dto: result.map((graphicsOrderReturn) => graphicsOrderReturn?.toResponseBody()) })
  }
}
