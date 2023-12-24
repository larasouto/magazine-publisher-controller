import { MapperError } from '@/core/errors/MapperErrors'
import { Distributor as PersistenceDistributor } from '@prisma/client'
import { Distributor } from '../domain/distributor'

export class DistributorMapper {
  static toDomain(raw: PersistenceDistributor) {
    const distributorOrError = Distributor.create(
      {
        name: raw.name,
        street: raw.street,
        number: raw.number,
        city: raw.city,
        state: raw.state,
        zip: raw.zip,
        complement: raw.complement,
        region: raw.region,
      },
      raw.id,
    )

    if (distributorOrError.isLeft()) {
      throw new MapperError(distributorOrError.value.message)
    }

    return distributorOrError.value
  }

  static async toPersistence(distributor: Distributor) {
    return {
      id: distributor.id,
      name: distributor.props.name,
      street: distributor.props.street,
      number: distributor.props.number,
      city: distributor.props.city,
      state: distributor.props.state,
      zip: distributor.props.zip,
      complement: distributor.props.complement,
      region: distributor.props.region,
    }
  }
}
