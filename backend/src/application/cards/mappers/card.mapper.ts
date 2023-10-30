import { MapperError } from '@/core/errors/MapperErrors'
import { Card as PersistenceCard } from '@prisma/client'
import { Card } from '../domain/card'

export class CardMapper {
  static toDomain(raw: PersistenceCard) {
    const cardOrError = Card.create(
      {
        number: raw.number,
        holder: raw.holder,
        expirationDate: raw.expiration_date,
        securityCode: raw.security_code,
        billingAddress: raw.billing_address,
        phone: raw.phone,
        type: raw.type,
        flag: raw.flag,
        userId: raw.user_id,
      },
      raw.id,
    )

    if (cardOrError.isLeft()) {
      throw new MapperError(cardOrError.value.message)
    }

    return cardOrError.value
  }

  static async toPersistence(card: Card) {
    return {
      id: card.id,
      number: card.props.number,
      holder: card.props.holder,
      expiration_date: card.props.expirationDate,
      security_code: card.props.securityCode,
      billing_address: card.props.billingAddress,
      phone: card.props.phone,
      type: card.props.type,
      flag: card.props.flag,
      user_id: card.props.userId,
    }
  }
}
