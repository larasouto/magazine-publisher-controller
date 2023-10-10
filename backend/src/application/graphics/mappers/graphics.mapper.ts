import { MapperError } from '@/core/errors/MapperErrors'
import { Graphics as PersistenceGraphics } from '@prisma/client'
import { Graphics } from '../domain/graphics'

export class GraphicsMapper {
  static toDomain(raw: PersistenceGraphics) {
    const graphics: Pick<Graphics, 'props'> = {
      props: {
        name: raw.name,
        addrees: raw.address,
      },
    }

    const graphicsOrError = Graphics.create(graphics.props, raw.id)

    if (graphicsOrError.isLeft()) {
      throw new MapperError(graphicsOrError.value.message)
    }

    if (graphicsOrError.isRight()) {
      return graphicsOrError.value
    }

    return null
  }

  static async toPersistence(graphics: Graphics) {
    return {
      id: graphics.id,
      name: graphics.props.name,
      addrees: graphics.props.addrees,
    }
  }
}
