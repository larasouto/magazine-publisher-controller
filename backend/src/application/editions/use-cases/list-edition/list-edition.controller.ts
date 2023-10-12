import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListEditions } from './list-edition'

export class ListEditionsController implements Controller {
  constructor(private listEditions: ListEditions) {}

  async handle(): Promise<HttpResponse> {
    const result = await this.listEditions.execute()

    return ok({ dto: result.map((edition) => edition?.toResponseBody()) })
  }
}
