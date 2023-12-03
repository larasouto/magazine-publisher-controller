import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListCandidateJobOpportunity } from './list-candidate-job-opportunity'
import { Controller } from '@/core/infra/controller'


export class ListCandidateJobOpportunitiesController implements Controller {
  constructor(private listCandidateJobOpportunities: ListCandidateJobOpportunity) {}

  async handle(): Promise<HttpResponse> {
    const result = await this.listCandidateJobOpportunities.execute()

    return ok({
      dto: result.map((candidateJobOpportunity) => candidateJobOpportunity?.toResponseBody()),
    })
  }
}