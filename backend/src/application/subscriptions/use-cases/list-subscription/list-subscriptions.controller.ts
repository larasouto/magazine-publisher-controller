import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListSubscriptions } from './list-subscriptions'

export class ListSubscriptionsController implements Controller {
  constructor(private listSubscriptions: ListSubscriptions) {}

  async handle(): Promise<HttpResponse> {
    const result = await this.listSubscriptions.execute()

    return ok({ dto: result.map((subscription) => subscription?.toResponseBody()) })
  }
}
