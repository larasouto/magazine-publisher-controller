import {  Subscription as PersistenceSubscription } from '@prisma/client'
import { Subscription } from '../domain/subscription'
import { MapperError } from '@/core/errors/MapperErrors'

export class SubscriptionMapper {
  static toDomain(raw: PersistenceSubscription) {
    const subscriptionOrError = Subscription.create(
      {
        name: raw.name,
        description: raw.description,
        type: raw.type,
        frequency: raw.frequency,
        price: raw.price,
        magazineId: raw.magazine_id,
      },
      raw.id,
    )

    if (subscriptionOrError.isLeft()) {
      throw new MapperError(subscriptionOrError.value.message)
    }

    return subscriptionOrError.value
  }

  static async toPersistence(subscription: Subscription) {
    return {
      id: subscription.id,
      name: subscription.props.name,
      description: subscription.props.description,
      type: subscription.props.type,
      frequency: subscription.props.frequency,
      price: subscription.props.price,
      magazine_id: subscription.props.magazineId,
    }
  }
}
