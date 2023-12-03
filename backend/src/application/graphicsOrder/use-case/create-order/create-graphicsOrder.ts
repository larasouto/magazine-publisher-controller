import { Either, left, right } from '@/core/logic/either'
import { GraphicsOrder } from '../../domain/graphicsOrder'
import { IGraphicsOrderRepository } from '../../repositories/interfaces/IGraphicsOrderRepository'
import { Status } from '../../domain/graphicsOrder.schema'

type CreateGraphicsOrderRequest = {
  receiptDate: Date
  departureDate: Date
  status: Status
  deliveryAddress: string
  exampleNumber: number
  price: number
  editionId: string
  graphicsDistributorId: string
  bookstoreId: string
}

type CreateGraphicsOrderResponse = Either<Error, GraphicsOrder>

export class CreateGraphicsOrder {
  constructor(private graphicsOrderRepository: IGraphicsOrderRepository) {}

  async execute(
    request: CreateGraphicsOrderRequest,
  ): Promise<CreateGraphicsOrderResponse> {
    const orderOrError = GraphicsOrder.create({
      ...request,
    })

    if (orderOrError.isLeft()) {
      return left(orderOrError.value)
    }

    const order = orderOrError.value
    await this.graphicsOrderRepository.create(order)

    return right(order)
  }
}
