import { Address } from '../../domain/address'
import { IAddressesRepository } from '../../repositories/interfaces/IAddressesRepository'

type ListAddressesResponse = Address[]

export class ListAddresses {
  constructor(private addressesRepository: IAddressesRepository) {}

  async execute(): Promise<ListAddressesResponse> {
    const addresses = await this.addressesRepository.list()
    return addresses
  }
}
