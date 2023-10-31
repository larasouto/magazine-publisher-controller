import { Advertising as PersistenceAdvertising } from '@prisma/client'
import { Advertising } from '../domain/advertising'
import { MapperError } from '@/core/errors/MapperErrors'

export class AdvertisingMapper {
  static toDomain(raw: PersistenceAdvertising) {
    const advertisingOrError = Advertising.create(
      {
        name: raw.name,
        description: raw.description,
        category: raw.category,
        numberOfPages: raw.number_of_pages,
        price: raw.price,
        magazineId: raw.magazine_id,
      },
      raw.id,
    )

    if (advertisingOrError.isLeft()) {
      throw new MapperError(advertisingOrError.value.message)
    }

    return advertisingOrError.value
  }

  static async toPersistence(advertising: Advertising) {
    return {
      id: advertising.id,
      name: advertising.props.name,
      description: advertising.props.description,
      category: advertising.props.category,
      number_of_pages: advertising.props.numberOfPages,
      price: advertising.props.price,
      magazine_id: advertising.props.magazineId,
    }
  }
}
