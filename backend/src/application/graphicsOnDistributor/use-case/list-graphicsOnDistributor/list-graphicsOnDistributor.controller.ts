
import { Controller } from '@/core/infra/controller'
import { ListGraphicsOnDistributor } from './list-graphicsOnDistributor'
import { HttpResponse, ok } from '@/core/infra/http-response'


export class ListGraphicsOnDistributorController implements Controller {
  constructor(private listGraphicsOnDistributor: ListGraphicsOnDistributor) {}

  async handle(): Promise<HttpResponse> {
    const result = await this.listGraphicsOnDistributor.execute()
    return ok({ dto: result.map((graphicsOnDistributor) => graphicsOnDistributor?.toResponseBody()) })
  }
}


