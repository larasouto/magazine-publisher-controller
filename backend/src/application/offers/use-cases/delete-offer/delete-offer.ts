import { Either, left, right } from '@/core/logic/either'
import { IOffersRepository } from '../../repositories/interfaces/IOffersRepository'
import { OneOrMoreOfferNotFoundError } from './errors/OneOrMoreOfferNotFoundError'
import { OfferNotFoundError } from './errors/OfferNotFoundError'

type DeleteOfferRequest = {
  ids: string[]
}

type DeleteOfferResponse = Either<OfferNotFoundError, null>

export class DeleteOffer {
  constructor(private offersRepository: IOffersRepository) {}

  async execute({
    ids: offerId,
  }: DeleteOfferRequest): Promise<DeleteOfferResponse> {
    const offerOrOffers = Array.isArray(offerId) ? offerId : [offerId]

    if (offerOrOffers.length === 0) {
      return left(new OfferNotFoundError())
    }
    const offerPromises = offerOrOffers
      .filter((offerId) => offerId)
      .map((offerId) => this.offersRepository.findById(offerId))

    const offers = await Promise.all(offerPromises)

    if (offers.some((offer) => offer === null)) {
      return left(
        offers.length > 1
          ? new OneOrMoreOfferNotFoundError()
          : new OfferNotFoundError(),
      )
    }

    await this.offersRepository.deleteMany(offerOrOffers)

    return right(null)
  }
}
