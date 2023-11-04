import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListPayments } from './list-payment'

export class ListPaymentsController implements Controller {
  constructor(private listPayments: ListPayments) {}

  async handle(): Promise<HttpResponse> {
    const result = await this.listPayments.execute()

    return ok({ dto: result.map((payment) => payment?.toResponseBody()) })
  }
}
