import { Advertising as PersistenceAdvertising } from '@prisma/client'
import { Advertising } from '../domain/advertising'
import { MapperError } from '@/core/errors/MapperErrors'

export class AdvertisingMapper {
  static toDomain(raw: PersistenceAdvertising) {
    const advertising: Pick<Advertising, 'props'> = {
      props: {
        name: raw.name,
        categoryAdvertising: raw.category_advertising,
        numberOfPages: raw.number_of_pages,
        price: raw.price,
      },
    }

    const advertisingOrError = Advertising.create(advertising.props, raw.id)

    if (advertisingOrError.isLeft()) {
      throw new MapperError(advertisingOrError.value.message)
    }

    if (advertisingOrError.isRight()) {
      return advertisingOrError.value
    }

    return null
  }

  static async toPersistence(advertising: Advertising) {
    return {
      id: advertising.id,
      name: advertising.props.name,
      categoryAdvertising: advertising.props.categoryAdvertising,
      numberOfPages: advertising.props.numberOfPages,
      price: advertising.props.price,
    }
  }
}
