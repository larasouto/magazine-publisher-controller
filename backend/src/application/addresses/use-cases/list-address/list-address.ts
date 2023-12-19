import { Address } from '../../domain/address'
import { IAddressesRepository } from '../../repositories/interfaces/IAddressesRepository'

type ListAddressesResponse = Address[]

type ListAddressesRequest = {
  userId: string
}

export class ListAddresses {
  constructor(private addressesRepository: IAddressesRepository) {}

  async execute({
    userId,
  }: ListAddressesRequest): Promise<ListAddressesResponse> {
    const addresses = await this.addressesRepository.list(userId)
    return addresses
  }
}
