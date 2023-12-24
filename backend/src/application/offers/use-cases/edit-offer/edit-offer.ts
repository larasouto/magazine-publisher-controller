import { Either, left, right } from '@/core/logic/either'
import { Offer } from '../../domain/offer'
import { IOffersRepository } from '../../repositories/interfaces/IOffersRepository'
import { IThemeRepository } from '@/application/themes/repositories/interfaces/IThemeRepository'
import { ICategoryRepository } from '@/application/categories/repositories/interfaces/ICategoryRepository'
import { IEditionRepository } from '@/application/editions/repositories/interfaces/IEditionRepository'
import { OfferNotFoundError } from './error/OfferNotFoundError'

type EditOfferRequest = {
  offerId: string
  discountPercentage: number
  dates: {
    from: Date
    to: Date
  }
  editions: string[]
}

type EditOfferResponse = Either<OfferNotFoundError, Offer>

export class EditOffer {
  constructor(
    private offersRepository: IOffersRepository,
  ) {}

  async execute({
    offerId,
    ...request
  }: EditOfferRequest): Promise<EditOfferResponse> {
    const offerOrError = Offer.create(request, offerId)

    if (offerOrError.isLeft()) {
      return left(offerOrError.value)
    }
    const offerExists = await this.offersRepository.findById(offerId)

    if (!offerExists) {
      return left(new OfferNotFoundError())
    }

    const offer = offerOrError.value
    await this.offersRepository.update(offer, request.editions)

    return right(offer)
  }
}
