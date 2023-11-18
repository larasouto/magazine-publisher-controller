import { MapperError } from '@/core/errors/MapperErrors'
import { Bookstore as PersistenceBookstore } from '@prisma/client'
import { Bookstore } from '../domain/bookstore'

export class BookstoreMapper {
  static toDomain(raw: PersistenceBookstore) {
    const bookstore: Pick<Bookstore, 'props'> = {
      props: {
        address: raw.address,
        name: raw.name,
      },
    }

    const bookstoreOrError = Bookstore.create(bookstore.props, raw.id)

    if (bookstoreOrError.isLeft()) {
      throw new MapperError(bookstoreOrError.value.message)
    }

    if (bookstoreOrError.isRight()) {
      return bookstoreOrError.value
    }

    return null
  }

  static async toPersistence(bookstore: Bookstore) {
    return {
      id: bookstore.id,
      address: bookstore.props.address,
      name: bookstore.props.name,
    }
  }
}
