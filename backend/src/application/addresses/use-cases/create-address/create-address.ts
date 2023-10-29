import { Either, left, right } from '@/core/logic/either'
import { Address } from '../../domain/address'
import { IAddressesRepository } from '../../repositories/interfaces/IAddressesRepository'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'

type CreateAddressRequest = {
  street: string
  number: number
  complement: string
  zip: string
  city: string
  state: string
  userId: string
}

type CreateAddressResponse = Either<Error, Address>

export class CreateAddress {
  constructor(
    private addressesRepository: IAddressesRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute(request: CreateAddressRequest): Promise<CreateAddressResponse> {
    const addressOrError = Address.create(request)

    if (addressOrError.isLeft()) {
      return left(addressOrError.value)
    }

    const userExists = await this.usersRepository.exists(request.userId)

    if (!userExists) {
      return left(new Error('User not found'))
    }

    const address = addressOrError.value
    await this.addressesRepository.create(address)

    return right(address)
  }
}
