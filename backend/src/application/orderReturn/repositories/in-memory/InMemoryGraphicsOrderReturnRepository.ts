import { GraphicsOrderReturn } from "../../domain/graphicsOrderReturn"
import { IGraphicsOrderReturnRepository } from "../interfaces/IGraphicsOrderReturnRepository"


export class InMemoryGraphicsOrderReturnsRepository implements IGraphicsOrderReturnRepository {
  constructor(public ordersReturn: GraphicsOrderReturn[] = []) {}

  async findById(id: string): Promise<GraphicsOrderReturn | null> {
    const orderReturn = this.ordersReturn.find(
      (orderReturn) => orderReturn.id === id,
    )

    if (!orderReturn) {
      return null
    }

    return orderReturn
  }

  async create(orderReturn: GraphicsOrderReturn): Promise<void> {
    this.ordersReturn.push(orderReturn)
  }

  async delete(id: string): Promise<void> {
    const orderReturnIndex = this.ordersReturn.findIndex(
      (orderReturn) => orderReturn.id === id,
    )

    this.ordersReturn.splice(orderReturnIndex, 1)
  }

  async deleteMany(ids: string[]): Promise<void> {
    ids.forEach((id) => {
      const orderReturnIndex = this.ordersReturn.findIndex(
        (orderReturn) => orderReturn.id === id,
      )

      this.ordersReturn.splice(orderReturnIndex, 1)
    })
  }

  async update(orderReturn: GraphicsOrderReturn): Promise<void> {
    const orderReturnIndex = this.ordersReturn.findIndex(
      (orderReturn) => orderReturn.id === orderReturn.id,
    )

    this.ordersReturn[orderReturnIndex] = orderReturn
  }

  async list(): Promise<GraphicsOrderReturn[]> {
    return this.ordersReturn
  }
}
