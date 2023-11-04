import { PaymentSubscription } from '../../domain/payment-subscription'
import { IPaymentSubscriptionsRepository } from '../../repositories/interfaces/IPaymentSubscriptionsRepository'

type ListPaymentsResponse = PaymentSubscription[]

export class ListPayments {
  constructor(private paymentsRepository: IPaymentSubscriptionsRepository) {}

  async execute(): Promise<ListPaymentsResponse> {
    const payments = await this.paymentsRepository.list()
    return payments
  }
}
