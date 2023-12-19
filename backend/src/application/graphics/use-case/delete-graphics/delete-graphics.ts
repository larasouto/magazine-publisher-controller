import { Either, left, right } from '@/core/logic/either'
import { GraphicNotFoundError } from './errors/GraphicNotFoundError'
import { IGraphicsRepository } from '../../repositories/Interfaces/IGraphicsRepository'
import { OneOrMoreGraphicNotFoundError } from './errors/OneOrMoreGraphicNotFoundError'

type DeleteGraphicRequest = {
  ids: string[]
}

type DeleteGraphicResponse = Either<GraphicNotFoundError, null>

export class DeleteGraphic {
  constructor(private graphicsRepository: IGraphicsRepository) {}

  async execute({
    ids: graphicId,
  }: DeleteGraphicRequest): Promise<DeleteGraphicResponse> {
    const graphicOrGraphics = Array.isArray(graphicId) ? graphicId : [graphicId]

    const graphicPromises = graphicOrGraphics
      .filter((graphicId) => graphicId)
      .map((graphicId) => this.graphicsRepository.findById(graphicId))

    const graphics = await Promise.all(graphicPromises)

    if (graphics.some((graphic) => graphic === null)) {
      return left(
        graphics.length > 1
          ? new OneOrMoreGraphicNotFoundError()
          : new GraphicNotFoundError(),
      )
    }

    await this.graphicsRepository.deleteMany(graphicOrGraphics)

    return right(null)
  }
}
