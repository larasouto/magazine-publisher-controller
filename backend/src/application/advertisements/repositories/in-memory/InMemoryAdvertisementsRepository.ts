import { Advertising } from '../../domain/advertising'
import { IAdvertisingRepository } from '../interfaces/IAdvertisingRepository'

export class InMemoryAdvertisingRepository implements IAdvertisingRepository {
  constructor(public advertisements: Advertising[] = []) {}

  async findById(id: string): Promise<Advertising | null> {
    const advertising = this.advertisements.find(
      (advertising) => advertising.id === id,
    )

    if (!advertising) {
      return null
    }

    return advertising
  }

  async create(advertising: Advertising): Promise<void> {
    this.advertisements.push(advertising)
  }

  async delete(id: string): Promise<void> {
    const advertisingIndex = this.advertisements.findIndex(
      (advertising) => advertising.id === id,
    )

    this.advertisements.splice(advertisingIndex, 1)
  }

  async deleteMany(ids: string[]): Promise<void> {
    ids.forEach((id) => {
      const advertisingIndex = this.advertisements.findIndex(
        (advertising) => advertising.id === id,
      )

      this.advertisements.splice(advertisingIndex, 1)
    })
  }

  async update(advertising: Advertising): Promise<void> {
    const advertisingIndex = this.advertisements.findIndex(
      (advertising) => advertising.id === advertising.id,
    )

    this.advertisements[advertisingIndex] = advertising
  }

  async list(): Promise<Advertising[]> {
    return this.advertisements
  }
}
