import { Either, left, right } from '@/core/logic/either'
import { IAdvertisingsRepository } from '../../repositories/interfaces/IAdvertisingsRepository'
import { AdvertisingNotFoundError } from './errors/AdvertisingNotFoundError'

type UpdateStatusAdvertisingRequest = {
  advertisingId: string
  status: number
}

type UpdateStatusAdvertisingResponse = Either<
  AdvertisingNotFoundError,
  null
>

export class UpdateStatusAdvertising {
  constructor(
    private advertisingsRepository: IAdvertisingsRepository,
  ) {}

  async execute({
    advertisingId,
    status,
  }: UpdateStatusAdvertisingRequest): Promise<UpdateStatusAdvertisingResponse> {
    const advertising =
      await this.advertisingsRepository.findById(advertisingId)

    if (!advertising) {
      return left(new AdvertisingNotFoundError())
    }

    await this.advertisingsRepository.updateStatus(
      advertisingId,
      status,
    )

    return right(null)
  }
}
