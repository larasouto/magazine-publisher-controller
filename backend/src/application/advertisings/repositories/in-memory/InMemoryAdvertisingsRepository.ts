import { Advertising } from '../../domain/advertising'
import { AdvertisingStatus } from '../../domain/advertising.schema'
import { IAdvertisingsRepository } from '../interfaces/IAdvertisingsRepository'

export class InMemoryAdvertisingsRepository implements IAdvertisingsRepository {
  constructor(public advertisings: Advertising[] = []) {}

  async findById(id: string): Promise<Advertising | null> {
    const advertising = this.advertisings.find(
      (advertising) => advertising.id === id,
    )

    if (!advertising) {
      return null
    }

    return advertising
  }

  async create(advertising: Advertising): Promise<void> {
    this.advertisings.push(advertising)
  }

  async deleteMany(ids: string[]): Promise<void> {
    ids.forEach((id) => {
      const advertisingIndex = this.advertisings.findIndex(
        (advertising) => advertising.id === id,
      )

      this.advertisings.splice(advertisingIndex, 1)
    })
  }

  async update(advertising: Advertising): Promise<void> {
    const advertisingIndex = this.advertisings.findIndex(
      (advertising) => advertising.id === advertising.id,
    )

    this.advertisings[advertisingIndex] = advertising
  }

  async list(): Promise<Advertising[]> {
    return this.advertisings
  }

  async updateStatus(id: string, newStatus: AdvertisingStatus): Promise<void> {
    const advertisingIndex = this.advertisings.findIndex(
      (paymentSubscription) => paymentSubscription.id === id,
    )

    if (advertisingIndex !== -1) {
      const paymentSubscription = {
        ...this.advertisings[advertisingIndex],
        status: newStatus,
      }

      this.advertisings[advertisingIndex] = Advertising.create({
        ...paymentSubscription.props,
      }).value as Advertising
    }
  }
}
