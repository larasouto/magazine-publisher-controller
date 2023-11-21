import { Order } from '../../domain/order'
import { OrderItemProps } from '../../domain/order.schema'

export interface IOrderRepository {
  findById(id: string): Promise<Order | null>
  create(order: Order, orderItem: OrderItemProps[]): Promise<void>
  deleteMany(ids: string[]): Promise<void>
  list(): Promise<Order[]>
  updateStatus(id: string, status: number): Promise<void>
  //getTotalValue(): Promise<number>
}
