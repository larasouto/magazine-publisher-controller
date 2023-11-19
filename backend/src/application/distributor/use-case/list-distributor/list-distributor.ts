import { Distributor } from '../../domain/distributor'
import { IDistributorRepository } from '../../repositories/Interfaces/IDistributorRepository'

type ListDistributorResponse = Distributor[]

export class ListDistributor {
  constructor(private distributorRepository: IDistributorRepository) {}

  async execute(): Promise<ListDistributorResponse> {
    const distributor = await this.distributorRepository.list()
    return distributor
  }
}
