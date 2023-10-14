import { Advertising } from '../../domain/advertising'
import { IAdvertisingRepository } from '../../repositories/interfaces/IAdvertisingRepository'

type ListAdvertisementsResponse = (Advertising | null)[]

export class ListAdvertisements {
  constructor(private advertisementsRepository: IAdvertisingRepository) {}

  async execute(): Promise<ListAdvertisementsResponse> {
    const advertisements = await this.advertisementsRepository.list()
    return advertisements
  }
}
