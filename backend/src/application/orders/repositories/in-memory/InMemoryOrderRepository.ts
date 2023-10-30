import { Order } from '../../domain/order'
import { IOrderRepository } from '../interfaces/IOrdersRepository'

export class InMemoryOrdersRepository implements IOrderRepository {
  constructor(public orders: Order[] = []) {}

  async findById(id: string): Promise<Order | null> {
    const order = this.orders.find((order) => order.id === id)

    if (!order) {
      return null
    }

    return order
  }

  async create(order: Order): Promise<void> {
    this.orders.push(order)
  }

  async deleteMany(ids: string[]): Promise<void> {
    ids.forEach((id) => {
      const orderIndex = this.orders.findIndex((order) => order.id === id)

      this.orders.splice(orderIndex, 1)
    })
  }

  async list(): Promise<Order[]> {
    return this.orders
  }
}
