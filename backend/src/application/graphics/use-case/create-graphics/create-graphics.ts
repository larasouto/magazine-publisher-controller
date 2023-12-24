import { Either, left, right } from '@/core/logic/either'
import { IGraphicsRepository } from '../../repositories/Interfaces/IGraphicsRepository'
import { Graphic } from '../../domain/graphics'

type CreateGraphicsRequest = {
  name: string
  street: string
  number: number
  city: string
  state: string
  zip: string
  complement?: string
}

type CreateGraphicsResponse = Either<Error, Graphic>

export class CreateGraphics {
  constructor(private graphicsRepository: IGraphicsRepository) {}

  async execute(
    request: CreateGraphicsRequest,
  ): Promise<CreateGraphicsResponse> {
    const graphicseOrError = Graphic.create(request)

    if (graphicseOrError.isLeft()) {
      return left(graphicseOrError.value)
    }

    const user = graphicseOrError.value
    await this.graphicsRepository.create(user)

    return right(user)
  }
}
