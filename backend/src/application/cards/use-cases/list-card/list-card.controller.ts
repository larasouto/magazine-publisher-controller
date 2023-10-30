import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListCards } from './list-card'

export class ListCardController implements Controller {
  constructor(private listCards: ListCards) {}

  async handle(): Promise<HttpResponse> {
    const result = await this.listCards.execute()

    return ok({ dto: result.map((card) => card?.toResponseBody()) })
  }
}
