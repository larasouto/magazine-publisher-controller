import { Either, left, right } from '@/core/logic/either'
import { AdPriceNotFoundError } from '../get-ad-price/errors/AdPriceNotFoundError'
import { AdPrice } from '../../domain/ad-price'
import { IAdPricesRepository } from '../../repositories/interfaces/IAdPricesRepository'
import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'

type EditAdPriceRequest = {
  adPriceId: string
  bannerPrice: number
  wholePagePrice: number
  doublePagePrice: number
  beginningPrice: number
  middlePrice: number
  endPrice: number
  magazineId: string
}

type EditAdPriceResponse = Either<AdPriceNotFoundError, AdPrice>

export class EditAdPrice {
  constructor(
    private adPricesRepository: IAdPricesRepository,
    private magazinesRepository: IMagazineRepository,
  ) {}

  async execute({
    adPriceId,
    ...request
  }: EditAdPriceRequest): Promise<EditAdPriceResponse> {
    const adPriceOrError = AdPrice.create(request, adPriceId)

    if (adPriceOrError.isLeft()) {
      return left(adPriceOrError.value)
    }

    const adPriceExists = await this.adPricesRepository.findById(adPriceId)

    if (!adPriceExists) {
      return left(new AdPriceNotFoundError())
    }

    const magazine = await this.magazinesRepository.exists(request.magazineId)

    if (!magazine) {
      return left(new Error('Revista não encontrada'))
    }

    const adPrice = adPriceOrError.value
    await this.adPricesRepository.update(adPrice)

    return right(adPrice)
  }
}
