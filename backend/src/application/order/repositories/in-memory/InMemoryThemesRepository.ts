import { Order } from '../../domain/order'
import { IOrderRepository } from '../interfaces/IThemeRepository'

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

  async delete(id: string): Promise<void> {
    const orderIndex = this.orders.findIndex((order) => order.id === id)

    this.orders.splice(orderIndex, 1)
  }

  async deleteMany(ids: string[]): Promise<void> {
    ids.forEach((id) => {
      const orderIndex = this.orders.findIndex((order) => order.id === id)

      this.orders.splice(orderIndex, 1)
    })
  }

  async update(order: Order): Promise<void> {
    const orderIndex = this.orders.findIndex((order) => order.id === order.id)

    this.orders[orderIndex] = order
  }

  async list(): Promise<Order[]> {
    return this.orders
  }
}
