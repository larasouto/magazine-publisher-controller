import { Either, left, right } from '@/core/logic/either'
import { Offer } from '../../domain/offer'
import { IOffersRepository } from '../../repositories/interfaces/IOffersRepository'
import { OfferItemsSchema } from '../../domain/offer.schema'

type CreateOfferRequest = {
  discountPercentage: number
  dates: {
    from: Date
    to: Date
  }
  editions: string[]
}

type CreateOfferResponse = Either<Error, Offer>

export class CreateOffer {
  constructor(
    private offersRepository: IOffersRepository,
  ) {}

  async execute(request: CreateOfferRequest): Promise<CreateOfferResponse> {
    const offerOrError = Offer.create(request)
    const offerItemsOrError = OfferItemsSchema.safeParse(request)

    if (offerOrError.isLeft()) {
      return left(offerOrError.value)
    }

    if (!offerItemsOrError.success) {
      return left(new Error('Pelo menos uma edição é obrigatória'))
    }

    const offer = offerOrError.value
    await this.offersRepository.create(offer, request.editions)

    return right(offer)
  }
}
