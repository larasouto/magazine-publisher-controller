import { PaymentAdvertising } from '../../domain/payment-advertising'
import { IPaymentAdvertisingsRepository } from '../../repositories/interfaces/IAdvertisingsRepository'

type ListPaymentsResponse = PaymentAdvertising[]

export class ListPayments {
  constructor(private paymentsRepository: IPaymentAdvertisingsRepository) {}

  async execute(): Promise<ListPaymentsResponse> {
    const payments = await this.paymentsRepository.list()
    return payments
  }
}
