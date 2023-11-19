import { Either, left, right } from '@/core/logic/either'
import { GraphicsOrderReturn } from '../../domain/graphicsOrderReturn'
import { IGraphicsOrderReturnRepository } from '../../repositories/interfaces/IGraphicsOrderReturnRepository'


type CreateGraphicsOrderReturnRequest = {
  returnDate: Date
  returnNumber: number
  graphicsOrderId: string
}

type CreateGraphicsOrderReturnResponse = Either<Error, GraphicsOrderReturn>

export class CreateGraphicsOrderReturn {
  static execute(data: any) {
    throw new Error('Method not implemented.')
  }
  constructor(private graphicsOrderReturnRepository: IGraphicsOrderReturnRepository) {}

  async execute(
    request: CreateGraphicsOrderReturnRequest,
  ): Promise<CreateGraphicsOrderReturnResponse> {
    const orderOrError = GraphicsOrderReturn.create(request)

    if (orderOrError.isLeft()) {
      return left(orderOrError.value)
    }

    const order = orderOrError.value
    await this.graphicsOrderReturnRepository.create(order)

    return right(order)
  }
}
