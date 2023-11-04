import { PaymentAdvertising } from '../../domain/payment-advertising'

export interface IPaymentAdvertisingsRepository {
  findById(id: string): Promise<PaymentAdvertising | null>
  create(paymentAdvertising: PaymentAdvertising): Promise<void>
  deleteMany(ids: string[]): Promise<void>
  list(): Promise<PaymentAdvertising[]>
  updateStatus(id: string, status: number): Promise<void>
}
