import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListAdvertisements } from './list-advertising'

export class ListAdvertisementsController implements Controller {
  constructor(private listAdvertisements: ListAdvertisements) {}

  async handle(): Promise<HttpResponse> {
    const result = await this.listAdvertisements.execute()

    return ok({ dto: result })
  }
}
