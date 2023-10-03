import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListPhotographers } from './list-photographer'

export class ListPhotographersController implements Controller {
  constructor(private listPhotographers: ListPhotographers) {}

  async handle(): Promise<HttpResponse> {
    const result = await this.listPhotographers.execute()

    console.log(result)
    return ok({ dto: result })
  }
}
