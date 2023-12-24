import { Either, left, right } from '@/core/logic/either'
import { GraphicsNotFoundError } from './errors/GraphicsNotFoundError'
import { IGraphicsRepository } from '../../repositories/Interfaces/IGraphicsRepository'
import { Graphic } from '../../domain/graphics'

type EditgraphicsRequest = {
  graphicId: string
  name: string
  street: string
  number: number
  city: string
  state: string
  zip: string
  complement?: string
}

type EditgraphicsResponse = Either<GraphicsNotFoundError, Graphic>

export class EditGraphics {
  constructor(private graphicsRepository: IGraphicsRepository) {}

  async execute({
    graphicId,
    ...request
  }: EditgraphicsRequest): Promise<EditgraphicsResponse> {
    const graphicsOrError = Graphic.create(request, graphicId)

    if (graphicsOrError.isLeft()) {
      return left(graphicsOrError.value)
    }

    const graphicsExists = await this.graphicsRepository.findById(graphicId)

    if (!graphicsExists) {
      return left(new GraphicsNotFoundError())
    }

    const graphics = graphicsOrError.value
    await this.graphicsRepository.update(graphics)

    return right(graphics)
  }
}
