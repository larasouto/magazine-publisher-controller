import { Magazine } from '../../domain/magazine'
import { IMagazineRepository } from '../../repositories/interfaces/IMagazineRepository'

type ListMagazinesResponse = Magazine[]

export class ListMagazines {
  constructor(private magazinesRepository: IMagazineRepository) {}

  async execute(): Promise<ListMagazinesResponse> {
    const magazines = await this.magazinesRepository.list()
    return magazines
  }
}
