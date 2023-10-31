import { PaymentSubscription } from '../../domain/payment-subscription'
import { PaymentSubscriptionStatus } from '../../domain/payment-subscription.schema'
import { IPaymentSubscriptionsRepository } from '../interfaces/IPaymentSubscriptionsRepository'

export class InMemoryPaymentSubscriptionsRepository
  implements IPaymentSubscriptionsRepository
{
  constructor(public paymentSubscriptions: PaymentSubscription[] = []) {}

  async findById(id: string): Promise<PaymentSubscription | null> {
    const paymentSubscription = this.paymentSubscriptions.find(
      (paymentSubscription) => paymentSubscription.id === id,
    )

    if (!paymentSubscription) {
      return null
    }

    return paymentSubscription
  }

  async create(paymentSubscription: PaymentSubscription): Promise<void> {
    this.paymentSubscriptions.push(paymentSubscription)
  }

  async deleteMany(ids: string[]): Promise<void> {
    ids.forEach((id) => {
      const paymentSubscriptionIndex = this.paymentSubscriptions.findIndex(
        (paymentSubscription) => paymentSubscription.id === id,
      )

      this.paymentSubscriptions.splice(paymentSubscriptionIndex, 1)
    })
  }

  async list(): Promise<PaymentSubscription[]> {
    return this.paymentSubscriptions
  }

  async updateStatus(
    id: string,
    newStatus: PaymentSubscriptionStatus,
  ): Promise<void> {
    const paymentIndex = this.paymentSubscriptions.findIndex(
      (paymentSubscription) => paymentSubscription.id === id,
    )

    if (paymentIndex !== -1) {
      const paymentSubscription = {
        ...this.paymentSubscriptions[paymentIndex],
        status: newStatus,
      }

      this.paymentSubscriptions[paymentIndex] = PaymentSubscription.create({
        ...paymentSubscription.props,
      }).value as PaymentSubscription
    }
  }
}
