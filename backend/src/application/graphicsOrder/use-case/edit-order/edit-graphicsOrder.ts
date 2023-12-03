import { Either, left, right } from '@/core/logic/either'
import { GraphicsOrder } from '../../domain/graphicsOrder'
import { IGraphicsOrderRepository } from '../../repositories/interfaces/IGraphicsOrderRepository'
import { GraphicsOrderNotFoundError } from '../get-order/errors/GraphicsOrderNotFoundError'
import { Status } from '../../domain/graphicsOrder.schema'

type EditgraphicsOrderRequest = {
  graphicsOrderId: string
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

type EditgraphicsResponse = Either<GraphicsOrderNotFoundError, GraphicsOrder>

export class EditGraphicsOrder {
  constructor(private graphicsRepository: IGraphicsOrderRepository) {}

  async execute({
    graphicsOrderId,
    ...request
  }: EditgraphicsOrderRequest): Promise<EditgraphicsResponse> {
    const graphicsOrError = GraphicsOrder.create(request, graphicsOrderId)

    if (graphicsOrError.isLeft()) {
      return left(graphicsOrError.value)
    }

    const graphicsExists =
      await this.graphicsRepository.findById(graphicsOrderId)

    if (!graphicsExists) {
      return left(new GraphicsOrderNotFoundError())
    }

    const graphics = graphicsOrError.value
    await this.graphicsRepository.update(graphics)

    return right(graphics)
  }
}
