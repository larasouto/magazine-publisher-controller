import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListCandidates } from './list-candidate'

export class ListCandidateController implements Controller {
  constructor(private listCandidates: ListCandidates) {}

  async handle(): Promise<HttpResponse> {
    const result = await this.listCandidates.execute()

    return ok({ dto: result.map((candidate) => candidate?.toResponseBody()) })
  }
}
