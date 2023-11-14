import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListReviews } from './list-review'

export class ListReviewsController implements Controller {
  constructor(private listReviews: ListReviews) {}

  async handle(): Promise<HttpResponse> {
    const result = await this.listReviews.execute()

    return ok({ dto: result.map((review) => review?.toResponseBody()) })
  }
}
