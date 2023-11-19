import { GraphicsOrder } from '../../domain/graphicsOrder'
import { IGraphicsOrderRepository } from '../interfaces/IGraphicsOrderRepository'

export class InMemoryGraphicsOrdersRepository
  implements IGraphicsOrderRepository
{
  constructor(public graphicsOrders: GraphicsOrder[] = []) {}

  async findById(id: string): Promise<GraphicsOrder | null> {
    const graphicsOrder = this.graphicsOrders.find(
      (graphicsOrder) => graphicsOrder.id === id,
    )

    if (!graphicsOrder) {
      return null
    }

    return graphicsOrder
  }

  async create(graphicsOrder: GraphicsOrder): Promise<void> {
    this.graphicsOrders.push(graphicsOrder)
  }

  async delete(id: string): Promise<void> {
    const graphicsOrderIndex = this.graphicsOrders.findIndex(
      (graphicsOrder) => graphicsOrder.id === id,
    )

    this.graphicsOrders.splice(graphicsOrderIndex, 1)
  }

  async deleteMany(ids: string[]): Promise<void> {
    ids.forEach((id) => {
      const graphicsOrderIndex = this.graphicsOrders.findIndex(
        (graphicsOrder) => graphicsOrder.id === id,
      )

      this.graphicsOrders.splice(graphicsOrderIndex, 1)
    })
  }

  async update(graphicsOrder: GraphicsOrder): Promise<void> {
    const graphicsOrderIndex = this.graphicsOrders.findIndex(
      (graphicsOrder) => graphicsOrder.id === graphicsOrder.id,
    )

    this.graphicsOrders[graphicsOrderIndex] = graphicsOrder
  }

  async list(): Promise<GraphicsOrder[]> {
    return this.graphicsOrders
  }
}
