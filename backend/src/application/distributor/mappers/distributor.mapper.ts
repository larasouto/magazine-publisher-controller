import { MapperError } from '@/core/errors/MapperErrors'
import { Distributor as PersistenceDistributor } from '@prisma/client'
import { Distributor } from '../domain/distributor'

export class DistributorMapper {
  static toDomain(raw: PersistenceDistributor) {
    const distributor: Pick<Distributor, 'props'> = {
      props: {
        name: raw.name,
        address: raw.address,
        region: raw.region,
      },
    }

    const distributorOrError = Distributor.create(distributor.props, raw.id)

    if (distributorOrError.isLeft()) {
      throw new MapperError(distributorOrError.value.message)
    }

    return distributorOrError.value
  }

  static async toPersistence(distributor: Distributor) {
    return {
      id: distributor.id,
      name: distributor.props.name,
      address: distributor.props.address,
      region: distributor.props.region,
    }
  }
}
