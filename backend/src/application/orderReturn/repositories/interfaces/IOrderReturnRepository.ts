import { OrderReturn } from '../../domain/orderReturn'

export interface IOrderReturnRepository {
  findById(id: string): Promise<OrderReturn | null>
  list(): Promise<(OrderReturn | null)[]>
  create(orderReturn: OrderReturn): Promise<void>
  update(orderReturn: OrderReturn): Promise<void>
  delete(id: string): Promise<void>
  deleteMany(ids: string[]): Promise<void>
}
