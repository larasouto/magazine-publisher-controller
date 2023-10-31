import { PaymentSubscription } from '@/application/payment-subscriptions/domain/payment-subscription'
import {
  PaymentSubscriptionStatus,
  PaymentMethod,
} from '@/application/payment-subscriptions/domain/payment-subscription.schema'

type PaymentSubscriptionOverrides = {
  subscriptionId?: string
  status?: number
  addressId?: string
  paymentMethod?: number
  customerId?: string
}

export class PaymentSubscriptionFactory {
  static create(overrides?: PaymentSubscriptionOverrides) {
    const paymentSubscription = PaymentSubscription.create({
      subscriptionId: 'test-subscription-id',
      status: PaymentSubscriptionStatus.PENDING,
      addressId: 'test-address-id',
      paymentMethod: PaymentMethod.CREDIT_CARD,
      customerId: 'test-customer-id',
      ...overrides,
    })

    return paymentSubscription.value as PaymentSubscription
  }
}
