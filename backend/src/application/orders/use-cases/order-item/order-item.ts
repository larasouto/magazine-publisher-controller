import { Either, left, right } from '@/core/logic/either'
import { Order } from '../../domain/order'
import { IOrderRepository } from '../../repositories/interfaces/IOrdersRepository'
import { IEditionRepository } from '@/application/editions/repositories/interfaces/IEditionRepository'

type CreateOrderRequest = {
  totalValue: number
  status: number
  addressId: string
  paymentMethod: number
  items: {
    id: string
    quantity: number
  }[]
  customerId: string
}

type CreateOrderResponse = Either<Error, Order>

export class CreateOrder {
  constructor(
    private ordersRepository: IOrderRepository,
    private editionsRepository: IEditionRepository,
  ) {}

  async execute(request: CreateOrderRequest): Promise<CreateOrderResponse> {
    const orderOrError = Order.create(request)

    if (orderOrError.isLeft()) {
      return left(orderOrError.value)
    }

    for (const edition of request.items) {
      const _edition = await this.editionsRepository.findById(edition.id)

      if (!_edition) {
        return left(new Error('One or more editions not found'))
      }
    }

    const order = orderOrError.value
    await this.ordersRepository.create(order)

    return right(order)
  }
}
