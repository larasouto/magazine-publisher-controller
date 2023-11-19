import { GraphicsOrder } from '../../domain/graphicsOrder'
import { IGraphicsOrderRepository } from '../../repositories/interfaces/IGraphicsOrderRepository'

type ListGraphicsOrderResponse = GraphicsOrder[]

export class ListGraphicsOrder {
  constructor(private graphicsOrderRepository: IGraphicsOrderRepository) {}

  async execute(): Promise<ListGraphicsOrderResponse> {
    const graphicsOrders = await this.graphicsOrderRepository.list()
    const filteredGraphicsOrders = graphicsOrders.filter(
      (graphicsOrder) => graphicsOrder !== null,
    ) as GraphicsOrder[]
    return filteredGraphicsOrders
  }
}
