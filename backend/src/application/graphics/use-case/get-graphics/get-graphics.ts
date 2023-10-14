import { Either, left, right } from '@/core/logic/either'
import { Graphics } from '../../domain/graphics'
import { GraphicsNotFoundError } from './errors/GraphicsNotFoundError'
import { IGraphicsRepository } from '../../repositories/Interfaces/IGraphicsRepository'

type GetGraphicsRequest = {
  graphicsId: string
}

type GetGraphicsResponse = Either<GraphicsNotFoundError, Graphics>

export class GetGraphics {
  constructor(private graphicssRepository: IGraphicsRepository) {}

  async execute({
    graphicsId,
  }: GetGraphicsRequest): Promise<GetGraphicsResponse> {
    const graphics = await this.graphicssRepository.findById(graphicsId)

    if (!graphics) {
      return left(new GraphicsNotFoundError())
    }

    return right(graphics)
  }
}
