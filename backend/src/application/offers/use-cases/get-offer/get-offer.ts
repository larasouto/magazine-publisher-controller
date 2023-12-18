import { Either, left, right } from '@/core/logic/either'
import { Offer } from '../../domain/offer'
import { IOffersRepository } from '../../repositories/interfaces/IOffersRepository'
import { OfferNotFoundError } from './error/OfferNotFoundError'

type GetOfferRequest = {
  offerId: string
}

type GetOfferResponse = Either<OfferNotFoundError, Offer>

export class GetOffer {
  constructor(private offersRepository: IOffersRepository) {}

  async execute({ offerId }: GetOfferRequest): Promise<GetOfferResponse> {
    const offer = await this.offersRepository.findById(offerId)

    if (!offer) {
      return left(new OfferNotFoundError())
    }

    return right(offer)
  }
}
