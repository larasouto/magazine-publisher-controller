import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListCards } from './list-card'

type ListCardsControllerRequest = {
  userId: string
}

export class ListCardController implements Controller {
  constructor(private listCards: ListCards) {}

  async handle(request: ListCardsControllerRequest): Promise<HttpResponse> {
    const result = await this.listCards.execute(request)

    return ok({ dto: result.map((card) => card?.toResponseBody()) })
  }
}
