import { Either, left, right } from '@/core/logic/either'
import { IOrderRepository } from '../../repositories/interfaces/IOrdersRepository'
import { OrderNotFoundError } from './errors/OrderNotFoundError'

type UpdateStatusOrderRequest = {
  orderId: string
  status: number
}

type UpdateStatusOrderResponse = Either<OrderNotFoundError, null>

export class UpdateStatusOrder {
  constructor(private ordersRepository: IOrderRepository) {}

  async execute({
    orderId,
    status,
  }: UpdateStatusOrderRequest): Promise<UpdateStatusOrderResponse> {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      return left(new OrderNotFoundError())
    }

    await this.ordersRepository.updateStatus(orderId, status)

    return right(null)
  }
}
