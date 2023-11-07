import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListDistributor } from './list-distributor'

export class ListDistributorController implements Controller {
  constructor(private listDistributors: ListDistributor) {}

  async handle(): Promise<HttpResponse> {
    const result = await this.listDistributors.execute()

    return ok({ dto: result })
  }
}
