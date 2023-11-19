import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListJobOpportunities } from './list-job-opportunity'

export class ListJobOpportunitiesController implements Controller {
  constructor(private listJobOpportunities: ListJobOpportunities) {}

  async handle(): Promise<HttpResponse> {
    const result = await this.listJobOpportunities.execute()

    return ok({
      dto: result.map((jobOpportunity) => jobOpportunity.toResponseBody()),
    })
  }
}
