import { Order } from '../../domain/order'
import { IOrderRepository } from '../../repositories/interfaces/IOrdersRepository'

type ListOrdersResponse = Order[]

type ListOrdersRequest = {
  userId: string
}

export class ListOrders {
  constructor(private ordersRepository: IOrderRepository) {}

  async execute({ userId }: ListOrdersRequest): Promise<ListOrdersResponse> {
    const orders = await this.ordersRepository.list(userId)
    return orders
  }
}
