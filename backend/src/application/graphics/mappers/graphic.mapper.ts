import { Graphic } from '../domain/graphics'
import { MapperError } from '@/core/errors/MapperErrors'
import { Graphic as PersistenceGraphic } from '@prisma/client'

export class GraphicMapper {
  static toDomain(raw: PersistenceGraphic) {
    const graphicOrError = Graphic.create(
      {
        name: raw.name,
        street: raw.street,
        number: raw.number,
        city: raw.city,
        state: raw.state,
        zip: raw.zip,
        complement: raw.complement,
      },
      raw.id,
    )

    if (graphicOrError.isLeft()) {
      throw new MapperError(graphicOrError.value.message)
    }

    return graphicOrError.value
  }

  static async toPersistence(graphic: Graphic) {
    return {
      id: graphic.id,
      name: graphic.props.name,
      street: graphic.props.street,
      number: graphic.props.number,
      city: graphic.props.city,
      state: graphic.props.state,
      zip: graphic.props.zip,
      complement: graphic.props.complement,
    }
  }
}
