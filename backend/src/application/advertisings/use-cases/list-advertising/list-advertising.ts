import { Advertising } from '../../domain/advertising'
import { IAdvertisingsRepository } from '../../repositories/interfaces/IAdvertisingsRepository'

type ListAdvertisingsResponse = Advertising[]

export class ListAdvertisings {
  constructor(private advertisingsRepository: IAdvertisingsRepository) {}

  async execute(): Promise<ListAdvertisingsResponse> {
    const advertisings = await this.advertisingsRepository.list()
    return advertisings
  }
}
