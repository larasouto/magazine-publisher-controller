import { Either, left, right } from '@/core/logic/either'
import { OrderNotFoundError } from './errors/OrderNotFoundError'
import { IOrderRepository } from '../../repositories/interfaces/IOrderRepository'
import { Order } from '../../domain/order'

type GetORderRequest = {
  orderId: string
}

type GetOrderResponse = Either<OrderNotFoundError, Order>

export class GetOrder {
  constructor(private ordersRepository: IOrderRepository) {}

  async execute({ orderId }: GetORderRequest): Promise<GetOrderResponse> {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      return left(new OrderNotFoundError())
    }

    return right(order)
  }
}
