import { Either, left, right } from '@/core/logic/either'
import { Advertising } from '../../domain/advertising'
import { IAdvertisingsRepository } from '../../repositories/interfaces/IAdvertisingsRepository'
import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { MagazineNotFoundError } from './errors/MagazineNotFoundError'

type CreateAdvertisingRequest = {
  name: string
  description?: string
  category: number
  numberOfPages: number
  price: number
  magazineId: string
}

type CreateAdvertisingResponse = Either<Error, Advertising>

export class CreateAdvertising {
  constructor(
    private advertisementsRepository: IAdvertisingsRepository,
    private magazinesRepository: IMagazineRepository,
  ) {}

  async execute(
    request: CreateAdvertisingRequest,
  ): Promise<CreateAdvertisingResponse> {
    const advertisingOrError = Advertising.create(request)

    if (advertisingOrError.isLeft()) {
      return left(advertisingOrError.value)
    }

    const magazine = await this.magazinesRepository.exists(request.magazineId)

    if (!magazine) {
      return left(new MagazineNotFoundError())
    }

    const advertising = advertisingOrError.value
    await this.advertisementsRepository.create(advertising)

    return right(advertising)
  }
}
