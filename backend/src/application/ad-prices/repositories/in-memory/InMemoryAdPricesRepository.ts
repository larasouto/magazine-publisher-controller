import { AdPrice } from '../../domain/ad-price'
import { IAdPricesRepository } from '../interfaces/IAdPricesRepository'

export class InMemoryAdPricesRepository implements IAdPricesRepository {
  constructor(public adPrices: AdPrice[] = []) {}

  async findById(id: string): Promise<AdPrice | null> {
    const adPrice = this.adPrices.find((adPrice) => adPrice.id === id)

    if (!adPrice) {
      return null
    }

    return adPrice
  }

  async create(adPrice: AdPrice): Promise<void> {
    this.adPrices.push(adPrice)
  }

  async deleteMany(ids: string[]): Promise<void> {
    ids.forEach((id) => {
      const adPriceIndex = this.adPrices.findIndex(
        (adPrice) => adPrice.id === id,
      )

      this.adPrices.splice(adPriceIndex, 1)
    })
  }

  async update(adPrice: AdPrice): Promise<void> {
    const adPriceIndex = this.adPrices.findIndex(
      (adPrice) => adPrice.id === adPrice.id,
    )

    this.adPrices[adPriceIndex] = adPrice
  }

  async list(): Promise<AdPrice[]> {
    return this.adPrices
  }
}
