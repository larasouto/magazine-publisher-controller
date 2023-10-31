import { MapperError } from '@/core/errors/MapperErrors'
import { PaymentSubscription as PersistencePaymentSubscription } from '@prisma/client'
import { PaymentSubscription } from '../domain/payment-subscription'

export class PaymentSubscriptionMapper {
  static toDomain(raw: PersistencePaymentSubscription) {
    const paymentSubscriptionOrError = PaymentSubscription.create(
      {
        subscriptionId: raw.subscription_id,
        status: raw.status,
        addressId: raw.address_id,
        cardId: raw.card_id,
        customerId: raw.customer_id,
      },
      raw.id,
    )

    if (paymentSubscriptionOrError.isLeft()) {
      throw new MapperError(paymentSubscriptionOrError.value.message)
    }

    return paymentSubscriptionOrError.value
  }

  static async toPersistence(paymentSubscription: PaymentSubscription) {
    return {
      id: paymentSubscription.id,
      subscription_id: paymentSubscription.props.subscriptionId,
      status: paymentSubscription.props.status,
      address_id: paymentSubscription.props.addressId,
      customer_id: paymentSubscription.props.customerId,
      card_id: paymentSubscription.props.cardId,
    }
  }
}
