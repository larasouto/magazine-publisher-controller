import { Edition as PersistenceEdition } from '@prisma/client'
import { Edition } from '../domain/edition'
import { MapperError } from '@/core/errors/MapperErrors'

export class EditionMapper {
  static toDomain(raw: PersistenceEdition) {
    const editionOrError = Edition.create(
      {
        number: raw.number,
        title: raw.title,
        description: raw.description,
        coverPath: raw.cover_path,
        price: raw.price,
        year: raw.year,
        publicationDate: raw.publication_date,
        numberOfCopies: raw.number_of_copies,
        numberOfPages: raw.number_of_pages,
        magazineId: raw.magazine_id,
      },
      raw.id,
    )

    if (editionOrError.isLeft()) {
      throw new MapperError(editionOrError.value.message)
    }

    return editionOrError.value
  }

  static async toPersistence(edition: Edition) {
    return {
      id: edition.id,
      number: edition.props.number,
      title: edition.props.title,
      description: edition.props.description,
      cover_path: edition.props.coverPath,
      price: edition.props.price,
      year: edition.props.year,
      publication_date: edition.props.publicationDate,
      number_of_copies: edition.props.numberOfCopies,
      number_of_pages: edition.props.numberOfPages,
      magazine_id: edition.props.magazineId,
    }
  }
}
