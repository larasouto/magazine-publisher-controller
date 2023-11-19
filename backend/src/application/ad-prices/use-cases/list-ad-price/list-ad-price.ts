import { IMagazineRepository } from '@/application/magazines/repositories/interfaces/IMagazineRepository'
import { AdPrice } from '../../domain/ad-price'
import { IAdPricesRepository } from '../../repositories/interfaces/IAdPricesRepository'

type ListAdPricesResponse = AdPrice[]

export class ListAdPrices {
  constructor(private advertisingsRepository: IAdPricesRepository) {}

  async execute(): Promise<ListAdPricesResponse> {
    const advertisings = await this.advertisingsRepository.list()
    return advertisings
  }
}
