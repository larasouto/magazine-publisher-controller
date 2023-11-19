import { Either, left, right } from '@/core/logic/either'
import { GraphicsNotFoundError } from './errors/GraphicsNotFoundError'
import { IGraphicsRepository } from '../../repositories/Interfaces/IGraphicsRepository'
import { Graphics } from '../../domain/graphics'

type EditgraphicsRequest = {
  graphicsId: string
  name: string
  address: string
}

type EditgraphicsResponse = Either<GraphicsNotFoundError, Graphics>

export class EditGraphics {
  constructor(private graphicsRepository: IGraphicsRepository) {}

  async execute({
    graphicsId,
    ...request
  }: EditgraphicsRequest): Promise<EditgraphicsResponse> {
    const graphicsOrError = Graphics.create(request, graphicsId)

    if (graphicsOrError.isLeft()) {
      return left(graphicsOrError.value)
    }

    const graphicsExists = await this.graphicsRepository.findById(graphicsId)

    if (!graphicsExists) {
      return left(new GraphicsNotFoundError())
    }

    const graphics = graphicsOrError.value
    await this.graphicsRepository.update(graphics)

    return right(graphics)
  }
}
