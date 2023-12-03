import { MapperError } from '@/core/errors/MapperErrors'
import { GraphicsOrder } from '../domain/graphicsOrder'
import { Status } from '../domain/graphicsOrder.schema'
import { GraphicsOrder as PersistenceGraphicsOrder } from '@prisma/client'

export class GraphicsOrderMapper {
  static toDomain(raw: PersistenceGraphicsOrder) {
    const hraphicsOrders: Pick<GraphicsOrder, 'props'> = {
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

    const hraphicsOrdersOrError = GraphicsOrder.create(hraphicsOrders.props, raw.id)

    if (hraphicsOrdersOrError.isLeft()) {
      throw new MapperError(hraphicsOrdersOrError.value.message)
    }

    if (hraphicsOrdersOrError.isRight()) {
      return hraphicsOrdersOrError.value
    }

    return null
  }

  static async toPersistence(hraphicsOrders: GraphicsOrder) {
    return {
      id: hraphicsOrders.id,
      receipt_date: hraphicsOrders.props.receiptDate,
      departure_date: hraphicsOrders.props.departureDate,
      status: hraphicsOrders.props.status,
      delivery_address: hraphicsOrders.props.deliveryAddress,
      example_number: hraphicsOrders.props.exampleNumber,
      price: hraphicsOrders.props.price,
      edition_Id: hraphicsOrders.props.editionId,
      graphicsDistributor_id: hraphicsOrders.props.graphicsDistributorId,
      bookstore_id: hraphicsOrders.props.bookstoreId,
    }
  }
}


