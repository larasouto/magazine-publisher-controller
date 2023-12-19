import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListSubscriptionsByUser } from './list-subscription'

type ListSubscriptionsControllerRequest = {
  userId: string
}

export class ListSubscriptionsController implements Controller {
  constructor(private listSubscriptions: ListSubscriptionsByUser) {}

  async handle(
    request: ListSubscriptionsControllerRequest,
  ): Promise<HttpResponse> {
    const result = await this.listSubscriptions.execute(request)
    console.log('uashduashduahsd teste')

    return ok({
      dto: result.map((subscription) => subscription?.toResponseBody()),
    })
  }
}
