import { Either, left, right } from '@/core/logic/either'
import { Advertising } from '../../domain/advertising'
import { IAdvertisingsRepository } from '../../repositories/interfaces/IAdvertisingsRepository'
import { AdvertisingNotFoundError } from './errors/AdvertisingNotFoundError'

type GetAdvertisingRequest = {
  advertisingId: string
}

type GetAdvertisingResponse = Either<AdvertisingNotFoundError, Advertising>

export class GetAdvertising {
  constructor(private advertisingsRepository: IAdvertisingsRepository) {}

  async execute({
    advertisingId,
  }: GetAdvertisingRequest): Promise<GetAdvertisingResponse> {
    const advertising =
      await this.advertisingsRepository.findById(advertisingId)

    if (!advertising) {
      return left(new AdvertisingNotFoundError())
    }

    return right(advertising)
  }
}
