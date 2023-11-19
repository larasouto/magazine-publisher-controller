import { MapperError } from '@/core/errors/MapperErrors'
import { GraphicsOrderReturn as PersistenceGraphicsOrderReturn } from '@prisma/client'
import { GraphicsOrderReturn } from '../domain/graphicsOrderReturn'

export class GraphicsOrderReturnMapper {
  static toDomain(raw: PersistenceGraphicsOrderReturn) {
    const orderReturn: Pick<GraphicsOrderReturn, 'props'> = {
      props: {
        returnDate: raw.return_date,
        returnNumber: raw.return_number,
        graphicsOrderId: raw.graphicsOrder_Id,
      },
    }

    const orderReturnOrError = GraphicsOrderReturn.create(
      orderReturn.props,
      raw.id,
    )

    if (orderReturnOrError.isLeft()) {
      throw new MapperError(orderReturnOrError.value.message)
    }

    if (orderReturnOrError.isRight()) {
      return orderReturnOrError.value
    }

    return null
  }

  static async toPersistence(orderReturn: GraphicsOrderReturn) {
    return {
      id: orderReturn.id,
      return_date: orderReturn.props.returnDate,
      return_number: orderReturn.props.returnNumber,
      graphicsOrder_Id: orderReturn.props.graphicsOrderId,
    }
  }
}
