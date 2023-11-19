import { Either, left, right } from '@/core/logic/either'
import { GraphicsOnDistributorNotFoundError } from './errors/GraphicsOnDistributorNotFoundError'
import { IGraphicsOnDistributorRepository } from '../../repositories/Interfaces/IGraphicsOnDistributorRepository'
import { GraphicsOnDistributor } from '../../domain/graphicsOnDistributor'


type GetGraphicsOnDistributorRequest = {
  graphicsOnDistributorId: string
}

type GetGraphicsOnDistributorResponse = Either<GraphicsOnDistributorNotFoundError, GraphicsOnDistributor>

export class GetGraphicsOnDistributor {
  constructor(private graphicssRepository: IGraphicsOnDistributorRepository) {}

  async execute({
    graphicsOnDistributorId,
  }: GetGraphicsOnDistributorRequest): Promise<GetGraphicsOnDistributorResponse> {
    const graphics = await this.graphicssRepository.findById(graphicsOnDistributorId)

    if (!graphics) {
      return left(new GraphicsOnDistributorNotFoundError())
    }

    return right(graphics)
  }
}
