import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { Listbookstore } from './list-bookstore'

export class ListBookstoreController implements Controller {
  constructor(private listBookstore: Listbookstore) {}

  async handle(): Promise<HttpResponse> {
    const result = await this.listBookstore.execute()

    return ok({ dto: result })
  }
}
