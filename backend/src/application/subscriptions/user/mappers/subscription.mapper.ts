import { MapperError } from '@/core/errors/MapperErrors'
import { CustomerSubscription as PersistenceSubscription } from '@prisma/client'
import { Subscription } from '../domain/subscription'

export class SubscriptionMapper {
  static toDomain(raw: PersistenceSubscription) {
    const subscriptionOrError = Subscription.create(
      {
        subscriptionId: raw.id,
        status: raw.status,
        userId: raw.user_id,
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
      subscription_id: subscription.props.subscriptionId,
      user_id: subscription.props.userId,
      status: subscription.props.status,
    }
  }
}
