import { Advertising as PersistenceAdvertising } from '@prisma/client'
import { Advertising } from '../domain/advertising'
import { MapperError } from '@/core/errors/MapperErrors'

export class AdvertisingMapper {
  static toDomain(raw: PersistenceAdvertising) {
    const advertisingOrError = Advertising.create(
      {
        imagePath: raw.image_path,
        title: raw.title,
        description: raw.description,
        category: raw.category,
        type: raw.type,
        status: raw.status,
        price: raw.price,
        magazineId: raw.magazine_id,
        userId: raw.user_id,
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
      image_path: advertising.props.imagePath,
      title: advertising.props.title,
      description: advertising.props.description,
      category: advertising.props.category,
      type: advertising.props.type,
      status: advertising.props.status,
      price: advertising.props.price,
      magazine_id: advertising.props.magazineId,
      user_id: advertising.props.userId,
    }
  }
}
