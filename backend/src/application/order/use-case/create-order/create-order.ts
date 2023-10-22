import { Either, left, right } from '@/core/logic/either'
import { Order } from '../../domain/order'
import { IOrderRepository } from '../../repositories/interfaces/IOrderRepository'
import { Status } from '../../domain/order.schema'

type CreateOrderRequest = {
  receiptDate: Date
  departureDate: Date
  status: Status
  deliveryAddress: string
  exampleNumber: number
  price: number
  editonId: string
  graphicsDistributorId: string
}

type CreateOrderResponse = Either<Error, Order>

export class CreateOrder {
  static execute(data: any) {
    throw new Error('Method not implemented.')
  }
  constructor(private ordersRepository: IOrderRepository) {}

  async execute(request: CreateOrderRequest): Promise<CreateOrderResponse> {
    const orderOrError = Order.create(request)

    if (orderOrError.isLeft()) {
      return left(orderOrError.value)
    }

    const order = orderOrError.value
    await this.ordersRepository.create(order)

    return right(order)
  }
}
