import { Order } from '../../domain/order'
import { IOrderRepository } from '../../repositories/interfaces/IThemeRepository'

type ListOrderResponse = Order[]

export class ListOrder {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(): Promise<ListOrderResponse> {
    const order = await this.orderRepository.list()
    return order
  }
}
