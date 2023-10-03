import { Magazine } from '@/application/magazines/domain/magazine'
import { MapperError } from '@/core/errors/MapperErrors'

import { Magazine as PersistenceMagazine } from '@prisma/client'
import { PublicationPeriod } from '../domain/magazine.schema'

export class MagazineMapper {
  static toDomain(raw: PersistenceMagazine) {
    const MagazineOrError = Magazine.create(
      {
        name: raw.name,
        description: raw.description,
        yearFounded: raw.year_founded,
        publicationPeriod: raw.publication_period as PublicationPeriod,
        themeId: raw.theme_id,
      },
      raw.id,
    )

    if (MagazineOrError.isLeft()) {
      throw new MapperError(MagazineOrError.value.message)
    }

    if (MagazineOrError.isRight()) {
      return MagazineOrError.value
    }

    return null
  }

  static async toPersistence(magazine: Magazine) {
    return {
      id: magazine.id,
      name: magazine.props.name,
      description: magazine.props.description,
      year_founded: magazine.props.yearFounded,
      publication_period: magazine.props.publicationPeriod.toString(),
      theme_id: magazine.props.themeId,
    }
  }
}
