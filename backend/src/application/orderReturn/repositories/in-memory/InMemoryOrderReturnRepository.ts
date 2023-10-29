import { OrderReturn } from '../../domain/orderReturn'
import { IOrderReturnRepository } from '../interfaces/IOrderReturnRepository'

export class InMemoryOrderReturnsRepository implements IOrderReturnRepository {
  constructor(public ordersReturn: OrderReturn[] = []) {}

  async findById(id: string): Promise<OrderReturn | null> {
    const orderReturn = this.ordersReturn.find(
      (orderReturn) => orderReturn.id === id,
    )

    if (!orderReturn) {
      return null
    }

    return orderReturn
  }

  async create(orderReturn: OrderReturn): Promise<void> {
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

  async update(orderReturn: OrderReturn): Promise<void> {
    const orderReturnIndex = this.ordersReturn.findIndex(
      (orderReturn) => orderReturn.id === orderReturn.id,
    )

    this.ordersReturn[orderReturnIndex] = orderReturn
  }

  async list(): Promise<OrderReturn[]> {
    return this.ordersReturn
  }
}
