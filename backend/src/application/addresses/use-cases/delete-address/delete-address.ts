import { Either, left, right } from '@/core/logic/either'
import { IAddressesRepository } from '../../repositories/interfaces/IAddressesRepository'
import { AddressNotFoundError } from './errors/AddressNotFoundError'
import { OneOrMoreAddressNotFoundError } from './errors/OneOrMoreAddressNotFoundError'

type DeleteAddressRequest = {
  addressId: string[]
}

type DeleteAddressResponse = Either<AddressNotFoundError, null>

export class DeleteAddress {
  constructor(private addressesRepository: IAddressesRepository) {}

  async execute({
    addressId,
  }: DeleteAddressRequest): Promise<DeleteAddressResponse> {
    const addressOrAddresses = Array.isArray(addressId)
      ? addressId
      : [addressId]

    const addressPromises = addressOrAddresses
      .filter((addressId) => addressId)
      .map((addressId) => this.addressesRepository.findById(addressId))

    const addresses = await Promise.all(addressPromises)

    if (addresses.some((address) => address === null)) {
      return left(
        addresses.length > 1
          ? new OneOrMoreAddressNotFoundError()
          : new AddressNotFoundError(),
      )
    }

    await this.addressesRepository.deleteMany(addressOrAddresses)

    return right(null)
  }
}
