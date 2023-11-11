import { Either, left, right } from '@/core/logic/either'
import { GraphicsOrderNotFoundError } from './errors/GraphicsOrderNotFoundError'
import { IGraphicsOrderRepository } from '../../repositories/interfaces/IGraphicsOrderRepository'
import { GraphicsOrder } from '../../domain/graphicsOrder'

type GetORderRequest = {
  graphicsOrderId: string
}

type GetGraphicsOrderResponse = Either<
  GraphicsOrderNotFoundError,
  GraphicsOrder
>

export class GetGraphicsOrder {
  constructor(private ordersRepository: IGraphicsOrderRepository) {}

  async execute({
    graphicsOrderId,
  }: GetORderRequest): Promise<GetGraphicsOrderResponse> {
    const order = await this.ordersRepository.findById(graphicsOrderId)

    if (!order) {
      return left(new GraphicsOrderNotFoundError())
    }

    return right(order)
  }
}
