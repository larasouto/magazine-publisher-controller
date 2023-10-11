import { Either, left, right } from '@/core/logic/either'
import { GraphicsNotFoundError } from './errors/GraphicsNotFoundError'
import { IGraphicsRepository } from '../../repositories/Interfaces/IGraphicsRepository'

type DeleteGraphicsRequest = {
  graphicsId: string
}

type DeleteGraphicsResponse = Either<GraphicsNotFoundError, null>

export class DeleteGraphics {
  constructor(private graphicssRepository: IGraphicsRepository) {}

  async execute({
    graphicsId,
  }: DeleteGraphicsRequest): Promise<DeleteGraphicsResponse> {
    const graphicsExists = await this.graphicssRepository.findById(graphicsId)

    if (!graphicsExists) {
      return left(new GraphicsNotFoundError())
    }

    await this.graphicssRepository.delete(graphicsId)

    return right(null)
  }
}
