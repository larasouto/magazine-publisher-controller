import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListOrderReturn } from './list-orderReturn'

export class ListOrderReturnController implements Controller {
  constructor(private listOrderReturn: ListOrderReturn) {}

  async handle(): Promise<HttpResponse> {
    const result = await this.listOrderReturn.execute()

    return ok({ dto: result })
  }
}
