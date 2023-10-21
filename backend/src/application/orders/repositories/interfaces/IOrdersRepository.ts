import { Order } from '../../domain/order'

export interface IOrderRepository {
  findById(id: string): Promise<Order | null>
  create(order: Order): Promise<void>
  update(order: Order): Promise<void>
  delete(id: string): Promise<void>
  deleteMany(ids: string[]): Promise<void>
  list(): Promise<Order[]>
}
