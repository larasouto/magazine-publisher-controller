import { Either, left, right } from '@/core/logic/either'
import { Graphic } from '../../domain/graphics'
import { GraphicsNotFoundError } from './errors/GraphicsNotFoundError'
import { IGraphicsRepository } from '../../repositories/Interfaces/IGraphicsRepository'

type GetGraphicsRequest = {
  graphicsId: string
}

type GetGraphicsResponse = Either<GraphicsNotFoundError, Graphic>

export class GetGraphics {
  constructor(private graphicsRepository: IGraphicsRepository) {}

  async execute({
    graphicsId,
  }: GetGraphicsRequest): Promise<GetGraphicsResponse> {
    const graphics = await this.graphicsRepository.findById(graphicsId)

    if (!graphics) {
      return left(new GraphicsNotFoundError())
    }

    return right(graphics)
  }
}
