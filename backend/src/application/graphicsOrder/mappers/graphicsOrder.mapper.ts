import { MapperError } from '@/core/errors/MapperErrors'
import { GraphicsOrder } from '../domain/graphicsOrder'
import { Status } from '../domain/graphicsOrder.schema'
import { GraphicsOrder as PersistenceGraphicsOrder } from '@prisma/client'

export class GraphicsOrderMapper {
  static toDomain(raw: PersistenceGraphicsOrder) {
    const order: Pick<GraphicsOrder, 'props'> = {
      props: {
        receiptDate: raw.receipt_date,
        departureDate: raw.departure_date,
        status: raw.status as Status,
        deliveryAddress: raw.delivery_address,
        exampleNumber: raw.example_number,
        price: raw.price,
        editionId: raw.edition_Id,
        graphicsDistributorId: raw.graphicsDistributor_id,
        bookstoreId: raw.bookstore_id,
      },
    }

    const orderOrError = GraphicsOrder.create(order.props, raw.id)

    if (orderOrError.isLeft()) {
      throw new MapperError(orderOrError.value.message)
    }

    if (orderOrError.isRight()) {
      return orderOrError.value
    }

    return null
  }

  static async toPersistence(order: GraphicsOrder) {
    return {
      id: order.id,
      receipt_date: order.props.receiptDate,
      departure_date: order.props.departureDate,
      status: order.props.status,
      delivery_address: order.props.deliveryAddress,
      example_number: order.props.exampleNumber,
      price: order.props.price,
      edition_Id: order.props.editionId,
      graphicsDistributor_id: order.props.graphicsDistributorId,
      bookstore_id: order.props.bookstoreId,
    }
  }
}
