import { Either, left, right } from '@/core/logic/either'
import { IAdPricesRepository } from '../../repositories/interfaces/IAdPricesRepository'
import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { MagazineNotFoundError } from './errors/MagazineNotFoundError'
import { AdPrice } from '../../domain/ad-price'

type CreateAdPriceRequest = {
  bannerPrice: number
  wholePagePrice: number
  doublePagePrice: number
  beginningPrice: number
  middlePrice: number
  endPrice: number
  magazineId: string
}

type CreateAdPriceResponse = Either<Error, AdPrice>

export class CreateAdPrice {
  constructor(
    private adPricesRepository: IAdPricesRepository,
    private magazinesRepository: IMagazineRepository,
  ) {}

  async execute(request: CreateAdPriceRequest): Promise<CreateAdPriceResponse> {
    const adPriceOrError = AdPrice.create(request)

    if (adPriceOrError.isLeft()) {
      return left(adPriceOrError.value)
    }

    const magazine = await this.magazinesRepository.exists(request.magazineId)

    if (!magazine) {
      return left(new MagazineNotFoundError())
    }

    const adPrice = adPriceOrError.value
    await this.adPricesRepository.create(adPrice)

    return right(adPrice)
  }
}
