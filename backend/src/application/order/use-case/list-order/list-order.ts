import { Order } from '../../domain/order'
import { IOrderRepository } from '../../repositories/interfaces/IOrderRepository'

type ListOrderResponse = Order[]

export class ListOrder {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(): Promise<ListOrderResponse> {
    const orders = await this.orderRepository.list();
    const filteredOrders = orders.filter((order) => order !== null) as Order[];
    return filteredOrders;
  }
}
