import { MapperError } from '@/core/errors/MapperErrors'
import { Order as PersistenceOrder } from '@prisma/client'
import { Order } from '../domain/order'

export class OrderMapper {
  static toDomain(raw: PersistenceOrder) {
    const orderOrError = Order.create(
      {
        totalValue: raw.total_value,
        status: raw.status,
        addressId: raw.address_id,
        paymentMethod: raw.payment_method,
        customerId: raw.customer_id,
      },
      raw.id,
    )

    if (orderOrError.isLeft()) {
      throw new MapperError(orderOrError.value.message)
    }

    return orderOrError.value
  }

  static async toPersistence(order: Order) {
    return {
      id: order.id,
      total_value: order.props.totalValue,
      status: order.props.status,
      address_id: order.props.addressId,
      payment_method: order.props.paymentMethod,
      customer_id: order.props.customerId,
    }
  }
}
