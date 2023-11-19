import { GraphicsOnDistributor } from '../../domain/graphicsOnDistributor'
import { IGraphicsOnDistributorRepository } from '../../repositories/Interfaces/IGraphicsOnDistributorRepository'

type ListGraphicsOnDistributorResponse = GraphicsOnDistributor[]

export class ListGraphicsOnDistributor {
  constructor(private GraphicsOnDistributorRepository: IGraphicsOnDistributorRepository) {}

  async execute(): Promise<ListGraphicsOnDistributorResponse> {
    const GraphicsOnDistributor = await this.GraphicsOnDistributorRepository.list()
    return GraphicsOnDistributor
  }
}
