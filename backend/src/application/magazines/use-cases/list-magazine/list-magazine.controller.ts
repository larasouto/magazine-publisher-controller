import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListMagazines } from './list-magazine'

export class ListMagazineController implements Controller {
  constructor(private listMagazines: ListMagazines) {}

  async handle(): Promise<HttpResponse> {
    const result = await this.listMagazines.execute()

    return ok({ dto: result })
  }
}
