import { Magazine } from '@/application/magazines/domain/magazine'
import { MapperError } from '@/core/errors/MapperErrors'

import { Magazine as PersistenceMagazine } from '@prisma/client'

export class MagazineMapper {
  static toDomain(raw: PersistenceMagazine) {
    const magazine: Pick<Magazine, 'props'> = {
      props: {
        name: raw.name,
        description: raw.description,
        yearFounded: raw.year_founded,
        publicationPeriod: raw.publication_period,
        themeId: raw.theme_id,
      },
    }

    const magazineOrError = Magazine.create(magazine.props, raw.id)

    if (magazineOrError.isLeft()) {
      throw new MapperError(magazineOrError.value.message)
    }

    return magazineOrError.value
  }

  static async toPersistence(magazine: Magazine) {
    return {
      id: magazine.id,
      name: magazine.props.name,
      description: magazine.props.description,
      year_founded: magazine.props.yearFounded,
      publication_period: magazine.props.publicationPeriod,
      theme_id: magazine.props.themeId,
    }
  }
}
