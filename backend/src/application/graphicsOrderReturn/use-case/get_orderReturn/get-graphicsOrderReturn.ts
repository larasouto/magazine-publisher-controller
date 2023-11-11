import { Either, left, right } from '@/core/logic/either'
import { GraphicsOrderReturnNotFoundError } from './errors/GraphicsOrderReturnNotFoundError'
import { GraphicsOrderReturn } from '../../domain/graphicsOrderReturn'
import { IGraphicsOrderReturnRepository } from '../../repositories/interfaces/IGraphicsOrderReturnRepository'

type GetORderRequest = {
  graphicsOrderReturnId: string
}

type GetGraphicsOrderReturnResponse = Either<GraphicsOrderReturnNotFoundError, GraphicsOrderReturn>

export class GetGraphicsOrderReturn {
  constructor(private graphicsOrderReturnsRepository: IGraphicsOrderReturnRepository) {}

  async execute({
    graphicsOrderReturnId,
  }: GetORderRequest): Promise<GetGraphicsOrderReturnResponse> {
    const graphicsOrderReturn =
      await this.graphicsOrderReturnsRepository.findById(graphicsOrderReturnId)

    if (!graphicsOrderReturn) {
      return left(new GraphicsOrderReturnNotFoundError())
    }

    return right(graphicsOrderReturn)
  }
}
