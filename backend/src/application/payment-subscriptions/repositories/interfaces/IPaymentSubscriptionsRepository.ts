import { PaymentSubscription } from '../../domain/payment-subscription'

export interface IPaymentSubscriptionsRepository {
  findById(id: string): Promise<PaymentSubscription | null>
  create(paymentSubscription: PaymentSubscription): Promise<void>
  deleteMany(ids: string[]): Promise<void>
  list(): Promise<PaymentSubscription[]>
  updateStatus(id: string, status: number): Promise<void>
}
