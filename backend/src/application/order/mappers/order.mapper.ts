import { MapperError } from '@/core/errors/MapperErrors'
import { Order as PersistenceOrder } from '@prisma/client'
import { Order } from '../domain/order'
import { Status } from '../domain/order.schema'

export class OrderMapper {
  static toDomain(raw: PersistenceOrder) {
    const order: Pick<Order, 'props'> = {
      props: {
        receiptDate: raw.receipt_date,
        departureDate: raw.departure_date,
        status: raw.status as Status,
        deliveryAddress: raw.delivery_address,
        exampleNumber: raw.example_number,
        price: raw.price,
        editonId: raw.editon_Id,
        graphicsDistributorId: raw.graphicsDistributor_id,
      },
    }

    const orderOrError = Order.create(order.props, raw.id)

    if (orderOrError.isLeft()) {
      throw new MapperError(orderOrError.value.message)
    }

    if (orderOrError.isRight()) {
      return orderOrError.value
    }

    return null
  }

  static async toPersistence(order: Order) {
    return {
      id: order.id,
      receipt_date: order.props.receiptDate,
      departure_date: order.props.departureDate,
      status: order.props.status.toString(),
      delivery_address: order.props.deliveryAddress,
      example_number: order.props.exampleNumber,
      price: order.props.price,
      editon_Id: order.props.editonId,
      graphicsDistributor_id: order.props.graphicsDistributorId,
    }
  }
}
