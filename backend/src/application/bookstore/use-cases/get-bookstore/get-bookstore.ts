import { Either, left, right } from '@/core/logic/either'
import { Bookstore } from '../../domain/bookstore'
import { BookstoreNotFoundError } from './errors/BookstoreNotFoundError'
import { IBookstoreRepository } from '../../repositories/interfaces/IBookstoresRepository'

type GetBookstoreRequest = {
  bookstoreId: string
}

type GetBookstoreResponse = Either<BookstoreNotFoundError, Bookstore>

export class GetBookstore {
  constructor(private bookstoresRepository: IBookstoreRepository) {}

  async execute({
    bookstoreId,
  }: GetBookstoreRequest): Promise<GetBookstoreResponse> {
    const bookstore = await this.bookstoresRepository.findById(bookstoreId)

    if (!bookstore) {
      return left(new BookstoreNotFoundError())
    }

    return right(bookstore)
  }
}
