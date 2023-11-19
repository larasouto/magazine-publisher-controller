import { Either, left, right } from '@/core/logic/either'
import { IAdPricesRepository } from '../../repositories/interfaces/IAdPricesRepository'
import { AdPriceNotFoundError } from './errors/AdPriceNotFoundError'
import { AdPrice } from '../../domain/ad-price'
import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'

type GetAdPriceRequest = {
  magazineId: string
}

type GetAdPriceResponse = Either<AdPriceNotFoundError, AdPrice>

export class GetAdPrice {
  constructor(private adPricesRepository: IAdPricesRepository) {}

  async execute({
    magazineId,
  }: GetAdPriceRequest): Promise<GetAdPriceResponse> {
    const adPrice = await this.adPricesRepository.findByMagazineId(magazineId)

    if (!adPrice) {
      return left(new AdPriceNotFoundError())
    }

    return right(adPrice)
  }
}
