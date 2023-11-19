import { Graphics } from '../../domain/graphics'
import { IGraphicsRepository } from '../../repositories/Interfaces/IGraphicsRepository'

type ListGraphicsResponse = Graphics[]

export class ListGraphics {
  constructor(private graphicsRepository: IGraphicsRepository) {}

  async execute(): Promise<ListGraphicsResponse> {
    const graphics = await this.graphicsRepository.list()
    return graphics
  }
}
