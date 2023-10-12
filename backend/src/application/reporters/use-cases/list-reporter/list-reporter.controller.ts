import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListReporters } from './list-reporter'

export class ListReportersController implements Controller {
  constructor(private listReporters: ListReporters) {}

  async handle(): Promise<HttpResponse> {
    const result = await this.listReporters.execute()

    return ok({ dto: result.map((reporter) => reporter.toResponseBody()) })
  }
}
