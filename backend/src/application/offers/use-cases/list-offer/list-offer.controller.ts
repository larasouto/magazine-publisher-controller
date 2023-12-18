import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListOffers } from './list-offer'

export class ListOfferController implements Controller {
  constructor(private listOffers: ListOffers) {}

  async handle(): Promise<HttpResponse> {
    const result = await this.listOffers.execute()

    return ok({ dto: result.map((offer) => offer?.toResponseBody()) })
  }
}
