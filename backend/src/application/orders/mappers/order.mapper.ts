import { MapperError } from '@/core/errors/MapperErrors'
import { Order as PersistenceOrder } from '@prisma/client'
import { Order } from '../domain/order'
import { OrderItemProps } from '../domain/order.schema'

export class OrderMapper {
  static toDomain(raw: PersistenceOrder, orderItems?: OrderItemProps[]) {
    const orderOrError = Order.create(
      {
        totalValue: raw.total_value,
        status: raw.status,
        addressId: raw.address_id,
        cardId: raw.card_id,
        customerId: raw.customer_id,
        orderItems,
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
      card_id: order.props.cardId,
      customer_id: order.props.customerId,
    }
  }
}
