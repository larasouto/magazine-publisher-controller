import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListReviews } from './list-review'

type ListReviewsControllerRequest = {
  editionId: string
}

export class ListReviewsController implements Controller {
  constructor(private listReviews: ListReviews) {}

  async handle(request: ListReviewsControllerRequest): Promise<HttpResponse> {
    const result = await this.listReviews.execute(request)

    return ok({ dto: result.map((review) => review?.toResponseBody()) })
  }
}
