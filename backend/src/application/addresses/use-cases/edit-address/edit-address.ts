import { Either, left, right } from '@/core/logic/either'
import { Address } from '../../domain/address'
import { IAddressesRepository } from '../../repositories/interfaces/IAddressesRepository'
import { AddressNotFoundError } from './errors/AddressNotFoundError'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { UserNotFoundError } from './errors/UserNotFoundError'

type EditAddressRequest = {
  addressId: string
  street: string
  number: number
  complement: string
  city: string
  state: string
  zip: string
  userId: string
}

type EditAddressResponse = Either<AddressNotFoundError, Address>

export class EditAddress {
  constructor(
    private addressesRepository: IAddressesRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    addressId,
    ...request
  }: EditAddressRequest): Promise<EditAddressResponse> {
    const addressOrError = Address.create(request, addressId)

    if (addressOrError.isLeft()) {
      return left(addressOrError.value)
    }

    const userExists = await this.usersRepository.findById(request.userId)

    if (!userExists) {
      return left(new UserNotFoundError())
    }

    const addressExists = await this.addressesRepository.findById(addressId)

    if (!addressExists) {
      return left(new AddressNotFoundError())
    }

    const address = addressOrError.value
    await this.addressesRepository.update(address)

    return right(address)
  }
}
