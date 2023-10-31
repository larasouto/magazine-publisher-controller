import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListAdvertisings } from './list-advertising'

export class ListAdvertisingController implements Controller {
  constructor(private listAdvertisings: ListAdvertisings) {}

  async handle(): Promise<HttpResponse> {
    const result = await this.listAdvertisings.execute()

    return ok({ dto: result.map((advertising) => advertising?.toResponseBody()) })
  }
}
