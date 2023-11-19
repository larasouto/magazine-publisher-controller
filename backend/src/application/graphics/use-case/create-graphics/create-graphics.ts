import { Either, left, right } from '@/core/logic/either'
import { IGraphicsRepository } from '../../repositories/Interfaces/IGraphicsRepository'
import { Graphics } from '../../domain/graphics'

type CreateGraphicsRequest = {
  name: string
  address: string
}

type CreateGraphicsResponse = Either<Error, Graphics>

export class CreateGraphics {
  constructor(private graphicsRepository: IGraphicsRepository) {}

  async execute(
    request: CreateGraphicsRequest,
  ): Promise<CreateGraphicsResponse> {
    const graphicseOrError = Graphics.create(request)

    if (graphicseOrError.isLeft()) {
      return left(graphicseOrError.value)
    }

    const user = graphicseOrError.value
    await this.graphicsRepository.create(user)

    return right(user)
  }
}
