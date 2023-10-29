import { Either, left, right } from '@/core/logic/either'
import { OrderReturnNotFoundError } from './errors/OrderReturnNotFoundError'
import { IOrderReturnRepository } from '../../repositories/interfaces/IOrderReturnRepository'
import { OrderReturn } from '../../domain/orderReturn'

type GetORderRequest = {
  orderReturnId: string
}

type GetOrderReturnResponse = Either<OrderReturnNotFoundError, OrderReturn>

export class GetOrderReturn {
  constructor(private orderReturnsRepository: IOrderReturnRepository) {}

  async execute({ orderReturnId }: GetORderRequest): Promise<GetOrderReturnResponse> {
    const orderReturn = await this.orderReturnsRepository.findById(orderReturnId)

    if (!orderReturn) {
      return left(new OrderReturnNotFoundError())
    }

    return right(orderReturn)
  }
}
