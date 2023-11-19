import { Either, left, right } from '@/core/logic/either'
import { IGraphicsOnDistributorRepository } from '../../repositories/Interfaces/IGraphicsOnDistributorRepository'
import { GraphicsOnDistributor } from '../../domain/graphicsOnDistributor'


type CreateGraphicsOnDistributorRequest = {
  graphicsId: string;
  distributorId: string;
};

type CreateGraphicsOnDistributorResponse = Either<Error, GraphicsOnDistributor>

export class CreateGraphicsOnDistributor {
  constructor(private graphicsOnDistributorRepository: IGraphicsOnDistributorRepository) {}

  async execute(
    request: CreateGraphicsOnDistributorRequest,
  ): Promise<CreateGraphicsOnDistributorResponse> {
    const graphicsOnDistributoreOrError = GraphicsOnDistributor.create(request)

    if (graphicsOnDistributoreOrError.isLeft()) {
      return left(graphicsOnDistributoreOrError.value)
    }

    const user = graphicsOnDistributoreOrError.value
    await this.graphicsOnDistributorRepository.create(user)

    return right(user)
  }
}
