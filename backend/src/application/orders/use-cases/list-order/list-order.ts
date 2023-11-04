import { Order } from '../../domain/order'
import { IOrderRepository } from '../../repositories/interfaces/IOrdersRepository'

type ListOrdersResponse = Order[]

export class ListOrders {
  constructor(private ordersRepository: IOrderRepository) {}

  async execute(): Promise<ListOrdersResponse> {
    const orders = await this.ordersRepository.list()
    return orders
  }
}
