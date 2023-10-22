import { MapperError } from '@/core/errors/MapperErrors'
import { OrderReturn as PersistenceOrderReturn } from '@prisma/client'
import { OrderReturn } from '../domain/orderReturn'

export class OrderReturnMapper {
  static toDomain(raw: PersistenceOrderReturn) {
    const orderReturn: Pick<OrderReturn, 'props'> = {
      props: {
        returnDate: raw.return_date,
        orderId: raw.order_Id,
        returnNumber: raw.return_number,
      },
    }

    const orderReturnOrError = OrderReturn.create(orderReturn.props, raw.id)

    if (orderReturnOrError.isLeft()) {
      throw new MapperError(orderReturnOrError.value.message)
    }

    if (orderReturnOrError.isRight()) {
      return orderReturnOrError.value
    }

    return null
  }

  static async toPersistence(orderReturn: OrderReturn) {
    return {
      id: orderReturn.id,
      return_date: orderReturn.props.returnDate,
      return_number: orderReturn.props.returnNumber,
      order_id: orderReturn.props.orderId,
    }
  }
}
