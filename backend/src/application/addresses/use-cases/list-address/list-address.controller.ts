import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListAddresses } from './list-address'

export class ListAddressController implements Controller {
  constructor(private listAddresses: ListAddresses) {}

  async handle(): Promise<HttpResponse> {
    const result = await this.listAddresses.execute()

    return ok({ dto: result.map((address) => address?.toResponseBody()) })
  }
}
