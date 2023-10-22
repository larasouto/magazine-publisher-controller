import { OrderReturn } from "../../domain/orderReturn"
import { IOrderReturnRepository } from "../interfaces/IOrderRetutrRepository"

export class InMemoryOrderReturnsRepository implements IOrderReturnRepository {
  constructor(public orderReturns: OrderReturn[] = []) {}

  async findById(id: string): Promise<OrderReturn | null> {
    const orderReturn = this.orderReturns.find((orderReturn) => orderReturn.id === id)

    if (!orderReturn) {
      return null
    }

    return orderReturn
  }

  async create(orderReturn: OrderReturn): Promise<void> {
    this.orderReturns.push(orderReturn)
  }

  async delete(id: string): Promise<void> {
    const orderReturnIndex = this.orderReturns.findIndex((orderReturn) => OrderReturn.id === id)

    this.orderReturns.splice(orderReturnIndex, 1)
  }

  async deleteMany(ids: string[]): Promise<void> {
    ids.forEach((id) => {
      const orderReturnIndex = this.orderReturns.findIndex((orderReturn) => orderReturn.id === id)

      this.orderReturns.splice(orderReturnIndex, 1)
    })
  }

  async update(orderReturn: OrderReturn): Promise<void> {
    const orderReturnIndex = this.orderReturns.findIndex((orderReturn) => orderReturn.id === orderReturn.id)

    this.orderReturns[orderReturnIndex] = orderReturn
  }

  async list(): Promise<OrderReturn[]> {
    return this.orderReturns
  }
}
