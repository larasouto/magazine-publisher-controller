import { Offer } from '@/application/offers/domain/offer'
import { MapperError } from '@/core/errors/MapperErrors'

import { Offer as PersistenceOffer } from '@prisma/client'

export class OfferMapper {
  static toDomain(raw: PersistenceOffer) {
    const offerOrError = Offer.create(
      {
        discountPercentage: raw.discount_percentage,
        dates: {
          from: raw.from,
          to: raw.to,
        },
      },
      raw.id,
    )

    if (offerOrError.isLeft()) {
      throw new MapperError(offerOrError.value.message)
    }

    return offerOrError.value
  }

  static async toPersistence(offer: Offer) {
    return {
      id: offer.id,
      discount_percentage: offer.props.discountPercentage,
      from: offer.props.dates.from,
      to: offer.props.dates.to,
    }
  }
}
