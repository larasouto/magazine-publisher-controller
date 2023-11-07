import { Either, left, right } from '@/core/logic/either'
import { Bookstore } from '../../domain/bookstore'
import { BookstoreNotFoundError } from '../delete-bookstore/errors/BookstoreNotFoundError'
import { IBookstoreRepository } from '../../repositories/interfaces/IBookstoresRepository'

type EditBookstoreRequest = {
  bookstoreId: string
  address: string
}

type EditBookstoreResponse = Either<BookstoreNotFoundError, Bookstore>

export class EditBookstore {
  constructor(private bookstoresRepository: IBookstoreRepository) {}

  async execute({
    bookstoreId,
    ...request
  }: EditBookstoreRequest): Promise<EditBookstoreResponse> {
    const bookstoreOrError = Bookstore.create(request, bookstoreId)

    if (bookstoreOrError.isLeft()) {
      return left(bookstoreOrError.value)
    }

    const bookstoreExists = await this.bookstoresRepository.findById(bookstoreId)

    if (!bookstoreExists) {
      return left(new BookstoreNotFoundError())
    }

    const bookstore = bookstoreOrError.value
    await this.bookstoresRepository.update(bookstore)

    return right(bookstore)
  }
}
