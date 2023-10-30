import { Either, left, right } from '@/core/logic/either'
import { Address } from '../../domain/address'
import { IAddressesRepository } from '../../repositories/interfaces/IAddressesRepository'
import { AddressNotFoundError } from './errors/AddressNotFoundError'

type GetAddressRequest = {
  addressId: string
}

type GetAddressResponse = Either<AddressNotFoundError, Address>

export class GetAddress {
  constructor(private addressesRepository: IAddressesRepository) {}

  async execute({ addressId }: GetAddressRequest): Promise<GetAddressResponse> {
    const address = await this.addressesRepository.findById(addressId)

    if (!address) {
      return left(new AddressNotFoundError())
    }

    return right(address)
  }
}
