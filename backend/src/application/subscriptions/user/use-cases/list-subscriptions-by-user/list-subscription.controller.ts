import { Controller } from '@/core/infra/controller'
import { ListSubscriptions } from './list-subscription'
import { HttpResponse, ok } from '@/core/infra/http-response'

type ListSubscriptionsControllerRequest = {
  userId: string
}

export class ListSubscriptionsController implements Controller {
  constructor(private listSubscriptions: ListSubscriptions) {}

  async handle({
    userId,
  }: ListSubscriptionsControllerRequest): Promise<HttpResponse> {
    const result = await this.listSubscriptions.execute(userId)

    return ok({
      dto: result.map((subscription) => subscription?.toResponseBody()),
    })
  }
}
