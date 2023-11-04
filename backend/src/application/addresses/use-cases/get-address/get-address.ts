import { Either, left, right } from '@/core/logic/either'
import { Address } from '../../domain/address'
import { IAddressesRepository } from '../../repositories/interfaces/IAddressesRepository'
import { AddressNotFoundError } from './errors/AddressNotFoundError'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { UserNotFoundError } from './errors/UserNotFoundError'

type GetAddressRequest = {
  addressId: string
  userId: string
}

type GetAddressResponse = Either<AddressNotFoundError, Address>

export class GetAddress {
  constructor(private addressesRepository: IAddressesRepository, private usersRepository: IUsersRepository) {}

  async execute({ addressId, userId }: GetAddressRequest): Promise<GetAddressResponse> {
    const address = await this.addressesRepository.findById(addressId)

    if (!address) {
      return left(new AddressNotFoundError())
    }

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new UserNotFoundError())
    }

    return right(address)
  }
}
