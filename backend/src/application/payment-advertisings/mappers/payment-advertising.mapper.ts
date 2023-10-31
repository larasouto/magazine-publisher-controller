import { MapperError } from '@/core/errors/MapperErrors'
import { PaymentAdvertising as PersistencePaymentAdvertising } from '@prisma/client'
import { PaymentAdvertising } from '../domain/payment-advertising'

export class PaymentAdvertisingMapper {
  static toDomain(raw: PersistencePaymentAdvertising) {
    const paymentAdvertisingOrError = PaymentAdvertising.create(
      {
        advertisingId: raw.advertising_id,
        status: raw.status,
        addressId: raw.address_id,
        cardId: raw.card_id,
        customerId: raw.customer_id,
      },
      raw.id,
    )

    if (paymentAdvertisingOrError.isLeft()) {
      throw new MapperError(paymentAdvertisingOrError.value.message)
    }

    return paymentAdvertisingOrError.value
  }

  static async toPersistence(paymentAdvertising: PaymentAdvertising) {
    return {
      id: paymentAdvertising.id,
      advertising_id: paymentAdvertising.props.advertisingId,
      status: paymentAdvertising.props.status,
      address_id: paymentAdvertising.props.addressId,
      customer_id: paymentAdvertising.props.customerId,
      card_id: paymentAdvertising.props.cardId,
    }
  }
}
