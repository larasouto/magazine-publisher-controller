import { Either, left, right } from '@/core/logic/either'
import { Advertising } from '../../domain/advertising'
import { IAdvertisingRepository } from '../../repositories/interfaces/IAdvertisingRepository'

type CreateAdvertisingRequest = {
  name: string
  categoryAdvertising: string
  numberOfPages: number
  price: number
}

type CreateAdvertisingResponse = Either<Error, Advertising>

export class CreateAdvertising {
  constructor(private advertisementsRepository: IAdvertisingRepository) {}

  async execute(
    request: CreateAdvertisingRequest,
  ): Promise<CreateAdvertisingResponse> {
    const advertisingOrError = Advertising.create(request)

    if (advertisingOrError.isLeft()) {
      return left(advertisingOrError.value)
    }

    const user = advertisingOrError.value
    await this.advertisementsRepository.create(user)

    return right(user)
  }
}
