import { MapperError } from '@/core/errors/MapperErrors'
import { GraphicsOnDistributor as PersistenceGraphicsOnDistributor } from '@prisma/client'
import { GraphicsOnDistributor } from '../domain/graphicsOnDistributor'

export class GraphicsOnDistributorMapper {
  static toDomain(raw: PersistenceGraphicsOnDistributor) {
    const graphicsOnDistributor: Pick<GraphicsOnDistributor, 'props'> = {
      props: {
        distributorId: raw.distributorId,
        graphicsId: raw.graphicsId,
      },
    }

    const graphicsOnDistributorOrError = GraphicsOnDistributor.create(graphicsOnDistributor.props, raw.id)

    if (graphicsOnDistributorOrError.isLeft()) {
      throw new MapperError(graphicsOnDistributorOrError.value.message)
    }

    return graphicsOnDistributorOrError.value
  }

  static async toPersistence(graphicsOnDistributor: GraphicsOnDistributor) {
    return {
      id: graphicsOnDistributor.id,
      graphicsId: graphicsOnDistributor.props.graphicsId,
      distributorId: graphicsOnDistributor.props.distributorId,
    }
  }
}
