import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListAddresses } from './list-address'

type ListAddressesControllerRequest = {
  userId: string
}

export class ListAddressController implements Controller {
  constructor(private listAddresses: ListAddresses) {}

  async handle(request: ListAddressesControllerRequest): Promise<HttpResponse> {
    const result = await this.listAddresses.execute(request)

    return ok({ dto: result.map((address) => address?.toResponseBody()) })
  }
}
