import { Order } from '../../domain/order'

export interface IOrderRepository {
  findById(id: string): Promise<Order | null>
  create(order: Order): Promise<void>
  deleteMany(ids: string[]): Promise<void>
  list(): Promise<Order[]>
  updateStatus(id: string, status: number): Promise<void>
}
