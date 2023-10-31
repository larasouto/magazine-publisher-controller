import { Either, left, right } from '@/core/logic/either'
import { Order } from '../../domain/order'
import { IOrderRepository } from '../../repositories/interfaces/IOrdersRepository'
import { OrderNotFoundError } from './errors/OrderNotFoundError'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { IAddressesRepository } from '@/application/addresses/repositories/interfaces/IAddressesRepository'
import { UserNotFoundError } from './errors/UserNotFoundError'

type GetOrderRequest = {
  orderId: string
  userId: string
}

type GetOrderResponse = Either<OrderNotFoundError, Order>

export class GetOrder {
  constructor(
    private ordersRepository: IOrderRepository,
    private usersRepository: IUsersRepository,
    private addressesRepository: IAddressesRepository,
  ) {}

  async execute({
    orderId,
    userId,
  }: GetOrderRequest): Promise<GetOrderResponse> {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      return left(new OrderNotFoundError())
    }

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new UserNotFoundError())
    }

    return right(order)
  }
}
