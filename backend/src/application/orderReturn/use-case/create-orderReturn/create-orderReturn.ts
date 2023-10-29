import { Either, left, right } from '@/core/logic/either'
import { OrderReturn } from '../../domain/orderReturn'
import { IOrderReturnRepository } from '../../repositories/interfaces/IOrderReturnRepository'

type CreateOrderReturnRequest = {
  returnDate: Date
  returnNumber: number
  orderId: string
}

type CreateOrderReturnResponse = Either<Error, OrderReturn>

export class CreateOrderReturn {
  static execute(data: any) {
    throw new Error('Method not implemented.')
  }
  constructor(private ordersRepository: IOrderReturnRepository) {}

  async execute(
    request: CreateOrderReturnRequest,
  ): Promise<CreateOrderReturnResponse> {
    const orderOrError = OrderReturn.create(request)

    if (orderOrError.isLeft()) {
      return left(orderOrError.value)
    }

    const order = orderOrError.value
    await this.ordersRepository.create(order)

    return right(order)
  }
}
