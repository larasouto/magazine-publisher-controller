import { PaymentAdvertising } from '../../domain/payment-advertising'
import { PaymentAdvertisingStatus } from '../../domain/payment-advertising.schema'
import { IPaymentAdvertisingsRepository } from '../interfaces/IAdvertisingsRepository'

export class InMemoryPaymentAdvertisingsRepository
  implements IPaymentAdvertisingsRepository
{
  constructor(public paymentAdvertisings: PaymentAdvertising[] = []) {}

  async findById(id: string): Promise<PaymentAdvertising | null> {
    const paymentAdvertising = this.paymentAdvertisings.find(
      (paymentAdvertising) => paymentAdvertising.id === id,
    )

    if (!paymentAdvertising) {
      return null
    }

    return paymentAdvertising
  }

  async create(paymentAdvertising: PaymentAdvertising): Promise<void> {
    this.paymentAdvertisings.push(paymentAdvertising)
  }

  async deleteMany(ids: string[]): Promise<void> {
    ids.forEach((id) => {
      const paymentAdvertisingIndex = this.paymentAdvertisings.findIndex(
        (paymentAdvertising) => paymentAdvertising.id === id,
      )

      this.paymentAdvertisings.splice(paymentAdvertisingIndex, 1)
    })
  }

  async list(): Promise<PaymentAdvertising[]> {
    return this.paymentAdvertisings
  }

  async updateStatus(
    id: string,
    newStatus: PaymentAdvertisingStatus,
  ): Promise<void> {
    const paymentIndex = this.paymentAdvertisings.findIndex(
      (paymentAdvertising) => paymentAdvertising.id === id,
    )

    if (paymentIndex !== -1) {
      const paymentAdvertising = {
        ...this.paymentAdvertisings[paymentIndex],
        status: newStatus,
      }

      this.paymentAdvertisings[paymentIndex] = PaymentAdvertising.create({
        ...paymentAdvertising.props,
      }).value as PaymentAdvertising
    }
  }
}
